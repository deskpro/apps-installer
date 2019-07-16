# Changelog

This project is following [Semantic Versioning](http://semver.org)

## [Unreleased][]

## [1.1.0][] - 2019-07-16

## [1.1.0][] - 2019-07-16

### Fixed

 - Upgrade `node-sass`

## [1.0.8][] - 2018-11-12

### Fixed

 - settings form uses the setting's title to display the label of the corresponding field

## [1.0.7][] - 2018-10-02

### Fixed

 - oauth2 methods no longer require specifying the protocolVersion when using a custom oauth2 configuration

## [1.0.7-beta.1][] - 2018-10-02

### Fixed

 - oauth2 methods no longer require specifying the protocolVersion when using a custom oauth2 configuration

## [1.0.6][] - 2018-09-11

### Added

  - enable travis to link the build artifact to a github PR

## [1.0.5][] - 2018-09-07

### Fixed

 - add explicit dependency to `fbjs` to allow `uniforms` to compile when an app requires and bundles the installer  

## [1.0.4][] - 2018-08-28

### Fixed

 - moved some dependencies from dev to allow customisation of the installer when packaged with an app 

## [1.0.3][] - 2018-08-28

### Added

 - publish the installer as library 

## [1.0.2][] - 2018-08-24

 - fix broken travis script

## [1.0.1][] - 2018-08-24

 - fix broken npm publishing logic

## [1.0.0][] - 2018-08-24

 - use the new apps sdks

## [0.4.6][] - 2018-06-01

### Changed

    - upgrade to @deskpro/apps-sdk-core version 1.0.1
    - upgrade to @deskpro/apps-dpat version 0.10.5
    - upgrade to @deskpro/react-components version 1.3.24

## [0.4.5][] - 2018-04-04

### Fixed

    - packaging build step fails when `@app` webpack resolver alias is null

## [0.4.4][] - 2018-04-03

### Changed

    - upgrade to @deskpro/apps-sdk-core version 1.0.0-beta.29
    - upgrade to @deskpro/apps-dpat version 0.10.3

### Fixed

    - `install-vendor.js` bundle was not generated anymore

## [0.4.3][] - 2018-03-02

 - updates to latest react-components version

## [0.4.2][] - 2017-11-24

### Fixed

 - installer fails to mark the app as installed on first time install

## [0.4.1][] - 2017-11-23

### Fixed

 - update settings form from the default settings installer not submitting values 

## [0.4.1][] - 2017-11-23

### Fixed

 - update settings form from the default settings installer not submitting values 

## [0.4.0][] - 2017-11-20

### Added

 - allow update of settings

### Changed

 - application starts with the settings screen

## [0.3.3][] - 2017-11-07

### Added

 - allow sources from github to be installed via npm 

## [0.3.2][] - 2017-10-27

### Changed

 - upgrade the version of @deskpro/apps-sdk-core

## [0.3.1][] - 2017-10-27

### Added

 - settings screen receives the dp app instance

## [0.3.0][] - 2017-10-24

### Changes

 - renames @deskproapps references to @deskpro

## [0.2.3][] - 2017-10-24

### Changes

 - re-generate github releases credentials after repository move 

## [0.2.2][] - 2017-10-10

### Fixed

 - broken github releases deploy configuration

## [0.2.1][] - 2017-10-10

### Fixed

 - compiled assets not published on npm
 - npm install failing on travis-ci.org due to using old npm version
 
### Changed

 - moved dependencies which are compiled into devDependencies section of package.json

## [0.2.0][] - 2017-10-09

### Fixed

 - using instance id when creating custom fields

### Changed

 - upgrade dependencies
 - use deskpro components 

## [0.1.0][] - 2017-10-03

### Added

 - initial release



[Unreleased]: https://github.com/DeskproApps/app-installer/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/DeskproApps/app-installer/compare/v1.0.8...v1.1.0
[1.0.8]: https://github.com/DeskproApps/app-installer/compare/v1.0.7...v1.0.8
[1.0.7]: https://github.com/DeskproApps/app-installer/compare/v1.0.7-beta.1...v1.0.7
[1.0.7-beta.1]: https://github.com/DeskproApps/app-installer/compare/v1.0.6...v1.0.7-beta.1
[1.0.6]: https://github.com/DeskproApps/app-installer/compare/v1.0.5...v1.0.6
[1.0.5]: https://github.com/DeskproApps/app-installer/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/DeskproApps/app-installer/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/DeskproApps/app-installer/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/DeskproApps/app-installer/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/DeskproApps/app-installer/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/DeskproApps/app-installer/compare/v0.4.6...v1.0.0
[0.4.6]: https://github.com/DeskproApps/app-installer/compare/v0.4.5...v0.4.6
[0.4.5]: https://github.com/DeskproApps/app-installer/compare/v0.4.4...v0.4.5
[0.4.4]: https://github.com/DeskproApps/app-installer/compare/v0.4.3...v0.4.4
[0.4.3]: https://github.com/DeskproApps/app-installer/compare/v0.4.2...v0.4.3
[0.4.2]: https://github.com/DeskproApps/app-installer/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/DeskproApps/app-installer/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/DeskproApps/app-installer/compare/v0.3.3...v0.4.0
[0.3.3]: https://github.com/DeskproApps/app-installer/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/DeskproApps/app-installer/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/DeskproApps/app-installer/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/DeskproApps/app-installer/compare/v0.2.3...v0.3.0
[0.2.3]: https://github.com/DeskproApps/app-installer/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/DeskproApps/app-installer/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/DeskproApps/app-installer/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/DeskproApps/app-installer/compare/v0.1.0...v0.2.0
