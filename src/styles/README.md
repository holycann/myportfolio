# Tailwind CSS Responsive Configuration

## Breakpoints

| Breakpoint | Minimum Width | Description |
|-----------|--------------|-------------|
| `xs`      | 375px        | Small mobile devices |
| `sm`      | 640px        | Mobile devices |
| `md`      | 768px        | Tablets |
| `lg`      | 1024px       | Laptops |
| `xl`      | 1280px       | Desktop |
| `2xl`     | 1536px       | Large desktop |

### Device-Specific Breakpoints

- `mobile`: Up to 767px
- `tablet`: 768px to 1023px
- `desktop`: 1024px and above

## Responsive Utilities

### Text Sizes

- `text-responsive-xs`: 0.75rem
- `text-responsive-sm`: 0.875rem
- `text-responsive-base`: 1rem
- `text-responsive-lg`: 1.125rem
- `text-responsive-xl`: 1.25rem

### Spacing

- `space-responsive-xs`: 0.25rem
- `space-responsive-sm`: 0.5rem
- `space-responsive-md`: 1rem
- `space-responsive-lg`: 1.5rem
- `space-responsive-xl`: 2rem

### Grid and Flex

- `grid-cols-responsive-2`: Auto-fit 2 columns
- `grid-cols-responsive-3`: Auto-fit 3 columns
- `grid-cols-responsive-4`: Auto-fit 4 columns

### Custom Utility Classes

- `.responsive-hide`: Hide on small screens
- `.responsive-show`: Show on small screens
- `.responsive-flex-col`: Change to column layout
- `.responsive-text-center`: Center text on small screens

## Usage Examples

### Responsive Text
```html
<div class="text-sm md:text-base lg:text-lg">
  Responsive text size
</div>
```

### Responsive Layout
```html
<div class="flex flex-col md:flex-row">
  Responsive flex direction
</div>
```

### Responsive Grid
```html
<div class="grid grid-cols-responsive-3 gap-4">
  Responsive grid layout
</div>
```

### Responsive Visibility
```html
<div class="hidden md:block">
  Only visible on medium screens and above
</div>
```

## Performance Considerations

- Uses `purge` to optimize for production
- Minimal custom utilities
- Leverages Tailwind's built-in responsive design system 