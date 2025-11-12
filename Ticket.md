# Implement Equipment Status Distribution Pie Chart

## Overview
Create a pie chart component that displays the current status distribution of equipment. The chart should show equipment count by status (Normal, Warning, Critical, Charging) with dummy data initially, but be structured to easily integrate with backend API in the future.

## Pie Chart Design Specifications

### Visual Description
The pie chart displays a circular chart with the following characteristics:

**Title & Subtitle:**
- Main Title: "Current Status Distribution" (centered above chart, prominent font)
- Subtitle: "Equipment count by status" (smaller font, below main title)

**Chart Segments:**
The pie chart consists of four segments, each representing a different equipment status:

1. **Normal Status (Green)**
   - Color: Green (#4CAF50 or similar vibrant green)
   - Count: 6
   - Largest segment (approximately 50% of the chart)
   - Label format: "Normal" with count displayed

2. **Warning Status (Orange)**
   - Color: Orange (#FF9800 or similar vibrant orange)
   - Count: 2
   - Medium segment (approximately 16.7% of the chart)
   - Label format: "Warning" with count displayed

3. **Critical Status (Red)**
   - Color: Red (#F44336 or similar vibrant red)
   - Count: 3
   - Medium segment (approximately 25% of the chart)
   - Label format: "Critical" with count displayed

4. **Charging Status (Blue)**
   - Color: Blue (#2196F3 or similar vibrant blue)
   - Count: 1
   - Smallest segment (approximately 8.3% of the chart)
   - Label format: "Charging" with count displayed

**Total Equipment:** 12 pieces (6 + 2 + 3 + 1)

**Chart Styling:**
- Clean, modern appearance with smooth edges
- Segments should have clear visual separation
- Legend or labels should be clearly visible
- Chart should be responsive and maintain aspect ratio
- Use appropriate spacing and padding around the chart

## Directory Structure Guide

Create the following directory structure following the existing project patterns in `frontend/src/app/`:

```
frontend/src/app/
├── shared/
│   ├── components/
│   │   └── status-distribution-chart/
│   │       ├── status-distribution-chart.component.ts
│   │       ├── status-distribution-chart.component.html
│   │       ├── status-distribution-chart.component.scss
│   │       ├── status-distribution-chart.component.spec.ts
│   │       └── models/
│   │           └── status-distribution.model.ts
│   └── services/
│       └── status-distribution.service.ts
└── enums.ts (update existing file if status enum needed)
```

### Directory Creation Steps

1. **Create component directory:**
   ```bash
   mkdir -p frontend/src/app/shared/components/status-distribution-chart/models
   ```

2. **Create service file:**
   ```bash
   # Service file will be created directly in shared/services/
   # No additional directory needed
   ```

### File Organization Notes
- **Components:** All shared components go in `shared/components/[component-name]/`
- **Services:** All shared services go directly in `shared/services/` (no subdirectories)
- **Models:** Component-specific models go in the component's `models/` subdirectory
- **Enums:** Shared enums go in the root `app/enums.ts` file
- Follow Angular naming conventions: kebab-case for directories and files, PascalCase for classes
- Follow existing patterns (see `shared/components/header/` and `shared/components/filters/` as examples)

## Requirements

### Functional Requirements
1. Display a pie chart titled "Current Status Distribution" with subtitle "Equipment count by status"
2. Show four status categories with their respective counts:
   - Normal: 6 (green)
   - Warning: 2 (orange)
   - Critical: 3 (red)
   - Charging: 1 (blue)
3. Use ApexCharts library (already installed) for visualization
4. Component should be reusable and follow Angular best practices

### Technical Requirements
1. **Component Structure:**
   - Create a standalone Angular component using Angular 20 patterns
   - Component selector: `app-status-distribution-chart` (kebab-case with 'app' prefix)
   - Use TypeScript interfaces/models for type safety
   - Implement OnPush change detection strategy for performance

2. **Data Structure:**
   - Create an interface/model for status data (e.g., `EquipmentStatus` or `StatusDistribution`)
   - Create a service interface/abstract class for future backend integration
   - Use dummy/mock data service initially
   - Structure data to match expected backend API response format

3. **Service Architecture:**
   - Create a service (e.g., `StatusDistributionService`) with:
     - Interface/type for the service contract
     - Mock implementation for dummy data
     - Observable-based data flow (RxJS) for future HTTP integration
     - Error handling structure in place

4. **Styling:**
   - Use SCSS for component styles
   - Follow existing project styling patterns
   - Ensure responsive design
   - Match color scheme: green (Normal), orange (Warning), red (Critical), blue (Charging)

5. **Code Quality:**
   - Follow Angular style guide
   - Use standalone components pattern
   - Implement proper TypeScript typing
   - Add JSDoc comments for public methods
   - Ensure accessibility (ARIA labels, proper chart titles)

### Integration Points
- Component should be easily integrable into dashboard or other views
- Service should be injectable and ready for HTTP client integration
- Data model should match expected backend response structure

## Acceptance Criteria
- [ ] Pie chart displays correctly with all four status categories
- [ ] Colors match specification (green, orange, red, blue)
- [ ] Chart title and subtitle are displayed
- [ ] Component is standalone and follows Angular 20 patterns
- [ ] Service structure is in place for backend integration
- [ ] TypeScript interfaces/models are defined
- [ ] Code passes linting (`npm run lint`)
- [ ] Code passes format check (`npm run format:check`)
- [ ] Component is responsive and accessible
- [ ] No console errors or warnings
- [ ] Directory structure follows the guide above

## Implementation Notes
- Use ApexCharts Angular wrapper or direct integration
- Consider using Angular Material for container/card if needed
- Ensure chart is responsive and works on different screen sizes
- Prepare service structure to easily swap mock data with HTTP calls

## Future Backend Integration
The service should be structured so that:
- Mock data can be replaced with HTTP calls to backend API
- Data transformation logic is separated from data fetching
- Error handling and loading states are considered
- API endpoint structure: `/api/equipment/status-distribution/` (to be confirmed)

## Testing Considerations
- Component renders without errors
- Chart displays all data points correctly
- Colors and labels match requirements
- Service returns expected data structure

## Pre-Merge Checklist
Before merging to master, ensure:
- [ ] All files are created in the correct directory structure
- [ ] Code follows project conventions
- [ ] Format check passes: `npm run format:check`
- [ ] Lint check passes: `npm run lint`
- [ ] Component is tested and working
- [ ] No console errors or warnings