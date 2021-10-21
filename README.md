# Telefaza (telefaza)

- [Telefaza (telefaza)](#telefaza-telefaza)
  - [About](#about)
  - [Donation](#donation)
  - [Available Versions](#available-versions)
  - [Demo](#demo)
  - [Release](#release)
  - [Devlopement](#devlopement)
    - [Install Dependencies](#install-dependencies)
    - [Development Mode](#development-mode)
    - [Build The App For Production](#build-the-app-for-production)
      - [SPA (Default)](#spa-default)
      - [Android (Capacitor)](#android-capacitor)
      - [IOS (Capacitor)](#ios-capacitor)
      - [Desktop (Electron)](#desktop-electron)
    - [Fetch And Parse Data](#fetch-and-parse-data)
    - [Lint The Files](#lint-the-files)
    - [Customize the configuration](#customize-the-configuration)
    - [CHANGELOG](#changelog)
    - [LICENSE](#license)

## About

A cross-platform built with [Quasar Framework](https://quasar.dev/) the [Vuejs](http://vuejs.org/) framework, The app allows you to watch any TV channel you want only through your device and collects you most of the channels you want in one place without having to search for each one separately

## Donation

Your donation will be very helpful for mw to stay motivated & keep this project up-to-date

- [Direct In PayPal](https://www.buymeacoffee.com/mohssineAboutaj)
- [With BuyMeCoffee](https://paypal.me/mohssineaboutaj)

## Available Versions

**Note**: if you don't find your platform bellow you can use the [`WEB` version](#demo)

- Web
- Mobile app
  - Android
  - IOS (not yet)
- Desktop app
  - Linux
  - Windows (not yet)
  - Mac (not yet)

## Demo

[Live Preview In The Browser](https://telefaza.netlify.app/)

## Release

- [v1.0.8](https://github.com/mohssineAboutaj/telefaza/releases/tag/v1.0.8)

## Devlopement

**Note**: i prefer to use `yarn` instead of `npm`

### Install Dependencies

```bash
yarn
```

### Development Mode

```bash
yarn dev
```

### Build The App For Production

#### SPA (Default)

```bash
yarn build
```

#### Android (Capacitor)

```bash
yarn build:android
```

#### IOS (Capacitor)

```bash
yarn build:ios
```

#### Desktop (Electron)

**Note**: Default desktop uotput depend on your working platform

```bash
yarn build:electron
```

### Fetch And Parse Data

```bash
yarn convert
```

### Lint The Files

```bash
yarn lint
```

### Customize the configuration

See [Configuring quasar.conf.js](https://v1.quasar.dev/quasar-cli/quasar-conf-js).

### CHANGELOG

[CHANGELOG](./CHANGELOG.md)

### LICENSE

[MIT](./LICENSE)
