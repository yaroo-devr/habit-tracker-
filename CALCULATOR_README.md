# Calculator App - React Native Portfolio

A fully functional calculator app built with React Native, featuring a clean, modern UI design inspired by iOS calculator.

## � Screenshots

### App Preview

![Calculator App Screenshot](./assets/images/calculator-screenshot.png)
_Main calculator interface with dark theme_

![Calculator Operations](./assets/images/calculator-operations.png)
_Calculator showing various operations in action_

### UI Components

![Button States](./assets/images/button-states.png)
_Different button states: normal, pressed, and active_

## 🎥 Demo Video

### App Walkthrough

![Calculator Demo](./assets/videos/calculator-demo.gif)
_Complete demonstration of calculator functionality_

**Video Features Shown:**

- Basic arithmetic operations (+, -, ×, ÷)
- Decimal calculations
- Percentage functionality
- Plus/minus toggle
- Clear operations
- Active button feedback
- Long number handling

> **Note:** To add your own images and videos:
>
> 1. Create an `assets` folder in your project root
> 2. Add `images` and `videos` subfolders
> 3. Place your screenshots in `assets/images/`
> 4. Place your demo videos/GIFs in `assets/videos/`
> 5. Update the file paths above to match your files

## �📱 Features

- ✅ Basic arithmetic operations (+, -, ×, ÷)
- ✅ Decimal point support
- ✅ Percentage calculations
- ✅ Plus/minus toggle
- ✅ Clear functionality
- ✅ Responsive design
- ✅ Dark theme UI
- ✅ Dynamic font sizing for long numbers
- ✅ Visual feedback for active operations

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Calculator.jsx          # Main calculator component
│   ├── CalculatorButton.jsx    # Reusable button component
│   └── CalculatorDisplay.jsx   # Display component
├── constants/
│   └── theme.js               # Color and size constants
├── hooks/
│   └── useCalculator.js       # Calculator logic hook
└── utils/
    └── calculatorUtils.js     # Utility functions
```

## 🔧 Component Architecture

### 1. **Calculator.jsx** (Main Component)

- Orchestrates the entire calculator interface
- Uses the custom hook for state management
- Renders display and button grid

### 2. **CalculatorButton.jsx** (Reusable Button)

- Handles different button types (number, operator, function)
- Supports wide buttons (like "0")
- Active state for operators

### 3. **CalculatorDisplay.jsx** (Display Component)

- Shows current value
- Dynamic font sizing based on number length
- Right-aligned text

### 4. **useCalculator.js** (Custom Hook)

- Manages calculator state
- Handles all calculator operations
- Returns methods for button interactions

### 5. **calculatorUtils.js** (Utility Functions)

- Pure functions for calculations
- Number formatting and validation
- Input handling logic

### 6. **theme.js** (Design System)

- Centralized colors and sizes
- Easy theming and customization

## 🎨 Design Specifications

### Colors

- **Background**: `#000000` (Black)
- **Number Buttons**: `#333333` (Dark Gray)
- **Operator Buttons**: `#FF9500` (Orange)
- **Function Buttons**: `#A6A6A6` (Light Gray)
- **Text Colors**: White for numbers/operators, black for functions

### Button Specifications

- **Height**: 80px
- **Border Radius**: 40px (circular)
- **Spacing**: 5px between buttons, 10px between rows
- **Zero Button**: Takes 2x width (wide button)

### Typography

- **Display**: 70px, ultra-light weight
- **Button Text**: 30px for numbers, 35px for operators

## 🚀 Getting Started

### Prerequisites

- Node.js (>=18)
- React Native development environment
- Android Studio or Xcode (for device testing)

### Installation & Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start Metro bundler**:

   ```bash
   npm start
   ```

3. **Run on Android**:

   ```bash
   npm run android
   ```

4. **Run on iOS**:
   ```bash
   npm run ios
   ```

## 🧪 Testing the Calculator

### Basic Operations

1. Tap number buttons to input values
2. Tap operation buttons (+, -, ×, ÷)
3. Tap equals (=) to get result
4. Tap "C" to clear

### Advanced Features

- **Decimal**: Tap "." to add decimal point
- **Percentage**: Tap "%" to convert to percentage
- **Plus/Minus**: Tap "+/-" to toggle sign
- **Continuous Operations**: Chain operations without pressing equals

### Edge Cases to Test

- Division by zero
- Very long numbers (auto font sizing)
- Multiple decimal points (should ignore)
- Operations with zero
- Percentage of percentages

## 🎯 Key Implementation Details

### State Management

The calculator uses React hooks for state management:

- `display`: Current display value
- `previousValue`: Stored value for operations
- `operation`: Current operation type
- `waitingForNewValue`: Flag for input handling

### Operation Flow

1. User inputs number → Updates display
2. User selects operation → Stores value and operation
3. User inputs second number → Updates display
4. User presses equals → Performs calculation and shows result

### Error Handling

- Division by zero returns 0
- Invalid operations are ignored
- Large numbers use scientific notation
- Decimal precision limited to 8 places

## 🎨 Customization Guide

### Changing Colors

Edit `src/constants/theme.js`:

```javascript
export const COLORS = {
  background: '#000000', // Change background
  operatorButton: '#FF9500', // Change operator color
  // ... other colors
};
```

### Adjusting Sizes

Edit button dimensions in `theme.js`:

```javascript
export const SIZES = {
  buttonHeight: 80, // Change button height
  buttonBorderRadius: 40, // Change roundness
  displayFontSize: 70, // Change display text size
};
```

### Adding New Functions

1. Add function to `calculatorUtils.js`
2. Add method to `useCalculator.js` hook
3. Add button in `Calculator.jsx`
4. Update button component if needed

## 📱 Device Compatibility

- **iOS**: iPhone 6+ and newer
- **Android**: API level 21+ (Android 5.0+)
- **Orientation**: Portrait mode optimized
- **Screen Sizes**: Responsive design works on all standard phone sizes

## 🔍 Code Quality Features

- **Modular Architecture**: Separated concerns across components
- **Custom Hooks**: Reusable calculator logic
- **Pure Functions**: Utility functions with no side effects
- **TypeScript Ready**: Easy to convert to TypeScript
- **Performance Optimized**: Uses useCallback for handlers

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler not starting**:

   ```bash
   npx react-native start --reset-cache
   ```

2. **Android build fails**:

   ```bash
   cd android && ./gradlew clean
   cd .. && npm run android
   ```

3. **iOS build fails**:
   ```bash
   cd ios && pod install
   cd .. && npm run ios
   ```

### Performance Tips

- The app is optimized for 60fps performance
- Button interactions have immediate visual feedback
- State updates are batched for better performance

## 📝 Next Steps & Enhancements

Potential features to add:

- [ ] Scientific calculator mode
- [ ] History of calculations
- [ ] Different themes (light/dark toggle)
- [ ] Haptic feedback
- [ ] Landscape orientation support
- [ ] Memory functions (M+, M-, MR, MC)
- [ ] Sound effects
- [ ] Accessibility improvements

## � Creating Screenshots & Videos

### For Screenshots:

1. **iOS Simulator**:

   - Use `Cmd + S` to save screenshot
   - Or use `Device > Screenshot` from menu

2. **Android Emulator**:

   - Use the camera icon in emulator toolbar
   - Or `Ctrl + S` (Windows) / `Cmd + S` (Mac)

3. **Physical Device**:
   - iOS: Press Volume Up + Power button
   - Android: Press Volume Down + Power button

### For Demo Videos:

1. **iOS Simulator**:

   ```bash
   xcrun simctl io booted recordVideo calculator-demo.mov
   # Press Ctrl+C to stop recording
   ```

2. **Android Emulator**:

   - Use "Screen Record" from extended controls (3 dots menu)
   - Or use external tools like QuickTime (Mac) or OBS

3. **Converting to GIF**:

   ```bash
   # Using ffmpeg
   ffmpeg -i calculator-demo.mov -vf "fps=10,scale=320:-1:flags=lanczos" calculator-demo.gif

   # Using online tools
   # Upload to ezgif.com, giphy.com, or similar
   ```

### Recommended Screenshot Sizes:

- **Portrait**: 375x812 (iPhone X) or 360x800 (Android)
- **File Format**: PNG for screenshots, GIF for demos
- **File Size**: Keep GIFs under 10MB for GitHub

### Directory Structure for Assets:

```
assets/
├── images/
│   ├── calculator-screenshot.png
│   ├── calculator-operations.png
│   └── button-states.png
└── videos/
    ├── calculator-demo.gif
    └── calculator-demo.mp4
```

## �📄 License

This project is part of a React Native portfolio and is available for educational and demonstration purposes.

---

**Happy Coding! 🚀**
