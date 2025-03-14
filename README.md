# 🏋️‍♂️ Essentiel — Simple workout journal

Welcome to my Workout Journaling app! This React-Native application helps you keep track of your workouts effectively. Whether you're hitting the gym, doing yoga, or going for a run, this app has got you covered!

## How to Get Started

Clone the Repository:
`git clone https://github.com/Lemonochrme/essentiel.git`

Navigate to the Project Directory:

`cd essentiel`


## Flutter Installation on Arch Linux

Prerequisites
- Ensure you have `git` and `base-devel` installed:
  ```sh
  sudo pacman -S git base-devel
  ```

### Install Flutter
1. Install Flutter using `pacman`:
   ```sh
   sudo pacman -S flutter
   ```
   Alternatively, install the latest version from AUR:
   ```sh
   yay -S flutter
   ```

2. Add Flutter to `PATH` (if needed):
   ```sh
   export PATH="$PATH:/opt/flutter/bin"
   ```

## Verify Installation
Run:
```sh
flutter doctor
```
Follow the suggested fixes.

### Install Android SDK 
1. Install `android-tools` and `android-sdk`:
   ```sh
   sudo pacman -S android-tools android-sdk
   ```

2. Install `android-sdk-platform-tools`, `android-sdk-cmdline-tools`, and `android-sdk-build-tools`:
   ```sh
   sudo pacman -S android-sdk-platform-tools android-sdk-cmdline-tools android-sdk-build-tools
   ```

3. Accept Android licenses:
   ```sh
   flutter doctor --android-licenses
   ```

### Troubleshooting
Run `flutter doctor` and follow any recommendations.
