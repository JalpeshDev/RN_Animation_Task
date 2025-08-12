# Card Animation (React Native + Expo)

This project demonstrates animated memory cards with smooth entrance animations and gesture-based interactions.

## Video

https://github.com/user-attachments/assets/cb0bd6b6-a99b-4586-a6f9-896e266508e8


## Setup and Run Instructions

1. Clone this repo
```bash
git clone https://github.com/JalpeshDev/RN_Animation_Task.git 
cd RN_Animation_Task
```
2. Install node modules 

```bash
npm install
```
3. Prebuild the project for native platforms 
```bash
npm run prebuild
```
4. Run on your desired platform
 ```bash
 npm run android
 # or
 npm run ios
```

## Animation Libraries Used
- [Moti](https://moti.fyi/): Provides smoother animations with no FPS drop.
- [React Native Reanimated (Moti depends on reanimated)](https://docs.swmansion.com/react-native-reanimated/)

#### Why Moti?
Moti offers a simple, declarative API for creating complex animations in React Native. It ensures smooth transitions and shared element effects without FPS drops, making it ideal for high-performance animations. Built on top of Reanimated, it allows for interruptible and highly customizable animations with minimal boilerplate code.

## Features
- **Entrance Animations**: Cards animate into view when loaded.
- **Gesture Support**: Expand/collapse cards using swipe gestures.
- **Smooth Transitions**: No FPS drop during animations.
- **Reusable Components**: Modular design for scalability.

## Improvements for a Real App
- Enhanced accessibility (screen reader labels, reduced motion support)
- Shared-element transitions for detail views
- Lazy-load high-res images after expansion
- Add unit tests for reliability

## Steps to Add More Animations
1. **Create a New Component**:
   - Add a new file in the `components` folder.

2. **Update the Animation Cards**:
   - Add a new entry to `animationCards.ts` in the `constants/data` folder.

3. **Style the Component**:
   - Use shared styles from `CardStyles.ts` or define custom styles for your new animation.

