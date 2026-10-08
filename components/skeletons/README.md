# Loading Skeleton Screens

This directory contains skeleton loading components that provide visual feedback during data fetching operations.

## Features

- **Improved UX**: Skeleton screens provide better perceived performance than blank screens or spinners
- **Layout Matching**: Each skeleton matches the structure of its corresponding page
- **Smooth Transitions**: Fade-in animations when transitioning from skeleton to loaded content
- **Mobile Optimized**: Responsive designs that work across all screen sizes

## Available Skeletons

### DashboardSkeleton
Loading state for the collector dashboard page with:
- Page header skeleton
- Stats grid (3 cards)
- Recent activity list
- Mobile FAB button

### WalletSkeleton
Loading state for the wallet page with:
- Page header skeleton
- Wallet balance card with gradient background
- Transaction filter tabs
- Transaction list items

### CollectionsSkeleton
Loading state for the collections page with:
- Page header skeleton
- Stats grid (4 cards)
- Filter chips (status and material)
- Sort dropdown
- Collection cards list

## Usage

```tsx
import { DashboardSkeleton } from "@/components/skeletons";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="animate-fade-in">
      {/* Your page content */}
    </div>
  );
}
```

## Base Skeleton Component

The `Skeleton` component in `components/ui/Skeleton.tsx` provides the foundation with:
- `Skeleton` - Base skeleton element with pulse animation
- `SkeletonText` - Multi-line text skeleton
- `SkeletonCard` - Card-shaped skeleton
- `SkeletonAvatar` - Circular avatar skeleton
- `SkeletonButton` - Button-shaped skeleton

## Best Practices

1. **Match Layout Structure**: Skeleton should mirror the actual content layout
2. **Use Consistent Spacing**: Maintain the same padding and gaps as real content
3. **Add Animations**: Use `animate-fade-in` class when transitioning to real content
4. **Consider Mobile**: Ensure skeletons work well on small screens
5. **Keep It Simple**: Don't over-complicate skeleton designs

## Implementation Notes

- All skeletons use CSS variables for theming (supports dark mode)
- Pulse animation is built into the base `Skeleton` component
- Loading duration is simulated with `setTimeout` (replace with actual API calls)
- Fade-in animation is defined in `app/globals.css`
