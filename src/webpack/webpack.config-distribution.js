const path = require('path');
const fs = require('fs');
const dpat = require('@deskpro/apps-dpat');
const projectPath = path.resolve(__dirname, '../../');

module.exports = function (env) {
  const PROJECT_ROOT_PATH = env && env.DP_PROJECT_ROOT ? env.DP_PROJECT_ROOT : projectPath;
  const PARENT_ROOT_PATH = path.resolve(PROJECT_ROOT_PATH, '../../..');
  const DEBUG = env && env.NODE_ENV === 'development';
  const ENVIRONMENT =  env && env.NODE_ENV ? env.NODE_ENV : 'production';

  const buildManifest = new dpat.BuildManifest(
    PROJECT_ROOT_PATH,
    { distributionType: 'production', packagingType: 'cdn' }
  );

  const resources = dpat.Resources.copyDescriptors(buildManifest, PROJECT_ROOT_PATH);
  const babelOptions = dpat.Babel.resolveOptions(PROJECT_ROOT_PATH, { babelrc: false });
  // the relative path of the assets inside the distribution bundle
  const ASSET_PATH = 'assets';

  const customSettingsScreenSrc = path.resolve(PROJECT_ROOT_PATH, 'src', 'settings', 'javascript');
  const useCustomSettingsSrc = fs.existsSync(customSettingsScreenSrc);
  const entryPointFilename = useCustomSettingsSrc ? 'entrypoint.settings.js' : 'entrypoint.js';

  const extractCssPlugin = new dpat.Webpack.ExtractTextPlugin({ filename: '[name].css', publicPath: `/${ASSET_PATH}/`, allChunks: true });

  const configParts = [{}];
  configParts.push({
    devtool: DEBUG ? 'source-map' : false,
    entry: {
      install: [
        path.resolve(PROJECT_ROOT_PATH, 'src', 'webpack', entryPointFilename)
      ],
      // 'install-vendor' bundle is create by CommonsChunkPlugin
    },
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
           include: [
              path.resolve(PROJECT_ROOT_PATH, 'src/main/javascript'),
              path.resolve(PARENT_ROOT_PATH, 'src'),
              useCustomSettingsSrc ? path.resolve(PROJECT_ROOT_PATH, 'src/settings/javascript') : null,
           ].filter(x => !!x).map(path => fs.realpathSync(path)),
          options: babelOptions
        },
        {
          test: /\.css$/,
          loader: extractCssPlugin.extract({ use: ['style-loader', 'css-loader'] })
        },
        {
          test: /\.scss$/,
          loader: extractCssPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader'] })
        },

        { test: /\.(png|jpg)$/, loader: 'url-loader', options: { limit: 15000 } },
        { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader' },
        { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/octet-stream' } },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader', options: { limit: 10000, mimetype: 'image/svg+xml' } },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } }

      ],
    },
    output: {
      pathinfo: DEBUG,
      chunkFilename: '[name].js',
      filename: '[name].js',
      path: path.resolve(PROJECT_ROOT_PATH, 'dist', ASSET_PATH)
    },
    plugins: [
      extractCssPlugin,
      new dpat.Webpack.IgnorePlugin(/meteor|graphql/),

      new dpat.Webpack.DefinePlugin({
        DEBUG: DEBUG,
        DPAPP_MANIFEST: JSON.stringify(buildManifest.getContent()),
        'process.env.NODE_ENV': JSON.stringify(ENVIRONMENT)
      }),

      // for stable builds, in production we replace the default module index with the module's content hashe
      new dpat.Webpack.HashedModuleIdsPlugin(),
      new dpat.Webpack.optimize.UglifyJsPlugin({
        sourceMap: DEBUG,
        compress: { unused: true, dead_code: true, warnings: false }
      }),

      // replace a standard webpack chunk hashing with custom (md5) one
      new dpat.Webpack.WebpackChunkHash(),

      // vendor libs + extracted manifest
      new dpat.Webpack.optimize.CommonsChunkPlugin({
        name: ['install-vendor'],
        minChunks: function (module) {
          // this assumes your vendor imports exist in the node_modules directory
          return module.context
            && module.context.substr(0, projectPath.length) === projectPath
            && module.context.indexOf("node_modules") !== -1
          ;
        }
      }),
      new dpat.Webpack.optimize.CommonsChunkPlugin({
        name: ['install-manifest'],
        minChunks: Infinity
      }),

      // export map of chunks that will be loaded by the extracted manifest
      new dpat.Webpack.ChunkManifestPlugin({ filename: 'install-manifest.json', manifestVariable: 'webpackManifest', inlineManifest: false }),
      // mapping of all source file names to their corresponding output file
      new dpat.Webpack.ManifestPlugin({ filename: 'install-manifest.json' }),

      new dpat.Webpack.CopyWebpackPlugin(resources, { debug: true, copyUnmodified: true }),
    ],
    resolve: {
      extensions: ['*', '.js', '.jsx', '.scss', '.css'],
      modules: [ "node_modules", dpat.path("node_modules"), path.join(PROJECT_ROOT_PATH, "node_modules") ],
      alias: {
          '@app': path.resolve(PARENT_ROOT_PATH, 'src')
      }
    },
    resolveLoader: {
      modules: [ "node_modules", dpat.path("node_modules"), path.join(PROJECT_ROOT_PATH, "node_modules") ]
    },
    node: { fs: 'empty' },
    bail: true
  });

  return Object.assign.apply(Object, configParts)
};
