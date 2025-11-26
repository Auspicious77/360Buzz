# Typography Component

A standardized typography system for consistent text styling across the application using DMSans font family.

## Features

- ✅ Predefined text variants (h1, h2, h3, h4, body, bodySmall, caption, button, link)
- ✅ Automatic font family mapping based on weight
- ✅ Type-safe props with TypeScript
- ✅ Convenience components for common use cases
- ✅ Eliminates repetitive font styling

## Usage

### Basic Usage with Variants

```tsx
import { Typography } from '../../src/components';

<Typography variant="h1">Main Heading</Typography>
<Typography variant="body" color="#333">Body text content</Typography>
<Typography variant="caption" align="center">Small caption text</Typography>
```

### Using Convenience Components

```tsx
import { Heading1, Heading2, BodyText, SmallText, Caption, ButtonText, LinkText } from '../../src/components';

<Heading1>Page Title</Heading1>
<Heading2 color="#FF6B00">Section Heading</Heading2>
<BodyText>Regular paragraph text</BodyText>
<SmallText color="#666">Smaller descriptive text</SmallText>
<Caption align="center">Tiny caption text</Caption>
<ButtonText color="#FFFFFF">Button Label</ButtonText>
<LinkText color="#FF6B00">Clickable Link</LinkText>
```

### Custom Font Weight

```tsx
import { Typography } from '../../src/components';

<Typography variant="body" weight="bold">Bold body text</Typography>
<Typography variant="h2" weight="light">Light heading</Typography>
```

### Available Font Weights

- `thin` - DMSans-Thin
- `light` - DMSans-Light
- `regular` - DMSans-Regular (default)
- `medium` - DMSans-Medium
- `semibold` - DMSans-SemiBold
- `bold` - DMSans-Bold
- `black` - DMSans-Black

## Text Variants

### Headings

| Variant | Font Size | Line Height | Default Weight |
|---------|-----------|-------------|----------------|
| `h1`    | 32px      | 40px        | bold           |
| `h2`    | 24px      | 32px        | bold           |
| `h3`    | 20px      | 28px        | semibold       |
| `h4`    | 18px      | 24px        | semibold       |

### Body Text

| Variant | Font Size | Line Height | Default Weight |
|---------|-----------|-------------|----------------|
| `body`  | 16px      | 24px        | regular        |
| `bodySmall` | 14px  | 20px        | regular        |
| `caption` | 12px    | 16px        | regular        |

### Special Variants

| Variant | Font Size | Line Height | Default Weight | Notes |
|---------|-----------|-------------|----------------|-------|
| `button` | 16px     | 24px        | bold           | For button labels |
| `link`   | 14px     | 20px        | semibold       | Has underline |

## Props

```typescript
interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySmall' | 'caption' | 'button' | 'link';
  weight?: 'thin' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'black';
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  style?: TextStyle; // Additional React Native styles
  children: React.ReactNode;
  // ... all other React Native Text props
}
```

## Examples

### Login/Auth Screens

```tsx
// Page title
<Heading2 color="#FFFFFF" align="center">Login Account</Heading2>

// Subtitle
<SmallText color="rgba(255, 255, 255, 0.8)" align="center">
  Please login into your account
</SmallText>

// Link text
<SmallText weight="semibold" color="#FF6B00">
  Forgot Password?
</SmallText>

// Button text
<ButtonText color="#FFFFFF">Login Account</ButtonText>

// Terms text
<Caption color="#666666" align="center">
  By "Login Account", you agree to the{' '}
  <Caption weight="semibold" color="#000000">Terms of Use</Caption>
</Caption>
```

### Form Labels and Inputs

```tsx
<Heading4 color="#000000">Company Details</Heading4>

<SmallText color="#333333">
  I agree to the{' '}
  <SmallText weight="semibold" color="#FF6B00">
    Terms and Conditions
  </SmallText>
</SmallText>
```

## Best Practices

### ✅ DO

- Use semantic variants (`h1`, `h2`, etc.) for proper hierarchy
- Use convenience components for cleaner code
- Override colors with the `color` prop
- Use `weight` prop to change font weight within the same variant
- Keep text alignment consistent within sections

```tsx
<Heading1 color="#000">Main Title</Heading1>
<BodyText color="#666">This is descriptive text</BodyText>
<SmallText weight="semibold" color="#FF6B00">Learn More</SmallText>
```

### ❌ DON'T

- Don't manually set `fontFamily` in style prop (use `weight` prop instead)
- Don't use inline styles for fontSize (use variants instead)
- Don't skip heading levels (e.g., h1 → h3)
- Don't use `<Text>` from React Native directly for styled text

```tsx
// ❌ Bad - manual font styling
<Text style={{ fontFamily: 'DMSans-Bold', fontSize: 24 }}>Title</Text>

// ✅ Good - use Typography
<Heading2>Title</Heading2>

// ❌ Bad - inline fontSize
<Typography style={{ fontSize: 18 }}>Text</Typography>

// ✅ Good - use appropriate variant
<Heading4>Text</Heading4>
```

## Migration Guide

### Before (Manual Styling)

```tsx
<Text style={styles.title}>Welcome</Text>

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'DMSans-Bold',
  },
});
```

### After (Typography Component)

```tsx
<Heading2 color="#000000">Welcome</Heading2>

// No style definition needed!
```

## Integration with Existing Code

The Typography component works alongside regular React Native Text:

```tsx
// For icon-only text or emojis, use regular Text
<Text style={styles.icon}>🔒</Text>

// For all styled text content, use Typography
<BodyText color="#000">Your password</BodyText>
```

## Performance

- Zero runtime overhead for font selection
- Styles are pre-computed and cached
- No re-renders from style calculations
- Works seamlessly with React Native optimization

## Type Safety

Full TypeScript support with autocomplete for:
- Variant names
- Font weights
- Text alignment options
- All standard Text props
