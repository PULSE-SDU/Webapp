# Implementation Ticket: Equipment Needing Attention Component

## Project Context
You are working on **PULSE**, a battery life prediction web application for monitoring medical equipment tags at Odense University Hospital. The project uses:
- **Frontend**: Angular 20.3 (standalone components) with Angular Material, Tailwind CSS, and TypeScript
- **Backend**: Django REST Framework (to be implemented later with MySQL)
- **Current State**: Only the header navigation is implemented; dashboard route exists but no component yet

## Component Design Requirements

Implement an **"Equipment Needing Attention"** component for the dashboard page with the following specifications:

### Visual Design:
- **Container**: White card with rounded corners, subtle shadow, on light grey background
- **Header Section**:
  - Title: "Equipment Needing Attention" (bold, dark grey, prominent)
  - Subtitle: "Sorted by predicted battery life" (smaller, lighter grey, below title)
- **List Items**: Each equipment entry in its own rounded rectangular container with:
  - **Left Section**:
    - Equipment name (bold, dark grey)
    - Status badge (pill-shaped, immediately right of name):
      - "critical" status: Red background with white text
      - "warning" status: Yellow/orange background with black text
    - Location (smaller, lighter grey, below name/status)
  - **Right Section** (right-aligned):
    - Battery percentage (large, bold, dark grey)
    - Days left (smaller, lighter grey, below percentage, format: "Xd left")

### Data Structure:
```typescript
interface EquipmentAttentionItem {
  id: string;                    // Unique identifier (e.g., "patient-monitor-c3")
  name: string;                   // Display name (e.g., "Patient Monitor C3")
  status: 'critical' | 'warning'; // Status enum
  location: string;               // Location details (e.g., "Emergency - Bay 1")
  batteryPercentage: number;      // Battery life percentage (e.g., 15)
  daysLeft: number;              // Predicted days remaining (e.g., 1)
}
```

### Sample Dummy Data:
```typescript
const dummyEquipmentData: EquipmentAttentionItem[] = [
  {
    id: 'patient-monitor-c3',
    name: 'Patient Monitor C3',
    status: 'critical',
    location: 'Emergency - Bay 1',
    batteryPercentage: 15,
    daysLeft: 1
  },
  {
    id: 'pulse-oximeter-h1',
    name: 'Pulse Oximeter H1',
    status: 'critical',
    location: 'Emergency - Bay 3',
    batteryPercentage: 18,
    daysLeft: 1
  },
  {
    id: 'ventilator-b3',
    name: 'Ventilator B3',
    status: 'critical',
    location: 'ICU - Room 304',
    batteryPercentage: 22,
    daysLeft: 2
  },
  {
    id: 'ecg-machine-g1',
    name: 'ECG Machine G1',
    status: 'warning',
    location: 'Cardiology - Room 201',
    batteryPercentage: 38,
    daysLeft: 4
  },
  {
    id: 'ventilator-b2',
    name: 'Ventilator B2',
    status: 'warning',
    location: 'ICU - Room 302',
    batteryPercentage: 45,
    daysLeft: 5
  }
];
```

## Implementation Requirements

### 1. Create Dashboard Component
- **Location**: `frontend/src/app/pages/dashboard/dashboard.component.ts` (and `.html`, `.scss`)
- **Type**: Standalone component following existing patterns
- **Imports**: Import necessary Angular Material modules
- **Purpose**: Main dashboard page that will contain the Equipment Needing Attention component

### 2. Create Equipment Attention Component
- **Location**: `frontend/src/app/shared/components/equipment-attention/`
- **Type**: Reusable standalone component
- **Input**: Accepts `EquipmentAttentionItem[]` as `@Input()`
- **Material Components**: Use Angular Material components where appropriate
  - Reference: https://material.angular.dev/components/categories
  - Consider using `mat-card`, `mat-list`, or custom styling with Material theming
- **Styling**: Follow the visual design specifications above

### 3. Create Models/Interfaces
- **Location**: `frontend/src/app/shared/models/equipment-attention-item.model.ts`
- **Content**: Define the `EquipmentAttentionItem` interface
- **Export**: Export for use across the application

### 4. Update Routing
- **File**: `frontend/src/app/app.routes.ts`
- **Action**: 
  - Remove the redirect for dashboard route
  - Add proper component route pointing to DashboardComponent
  - Example: `{ path: 'dashboard', component: DashboardComponent }`

### 5. Styling Guidelines
- Use Tailwind CSS utility classes where appropriate
- Leverage Angular Material theming (already configured with cyan primary, orange tertiary)
- Follow the existing design system (see `header` component for reference)
- Ensure responsive design
- **Status badge colors**:
  - Critical: Red (`#ef4444` or Material red palette)
  - Warning: Yellow/Orange (`#f59e0b` or Material orange palette)

### 6. Backend Compatibility
- Structure the component to easily accept data from HTTP service calls
- Use `@Input()` decorator for data binding
- Prepare for future service injection pattern:
  ```typescript
  // Future-ready structure:
  constructor(private equipmentService: EquipmentService) {}
  
  ngOnInit() {
    // Will be: this.equipmentService.getEquipmentNeedingAttention().subscribe(...)
    // For now: use dummy data
  }
  ```
- Ensure data structure matches what MySQL/Django REST will provide (JSON format)

### 7. Angular Material Components to Consider
- `MatCardModule` for the container
- `MatListModule` or custom list items
- `MatChipsModule` for status badges (optional, or use custom badges)
- `MatIconModule` if icons are needed
- Reference: https://material.angular.dev/components/categories

## File Structure to Create

```
frontend/src/app/
├── pages/
│   └── dashboard/
│       ├── dashboard.component.ts
│       ├── dashboard.component.html
│       ├── dashboard.component.scss
│       └── dashboard.component.spec.ts
├── shared/
│   ├── components/
│   │   └── equipment-attention/
│   │       ├── equipment-attention.component.ts
│   │       ├── equipment-attention.component.html
│   │       ├── equipment-attention.component.scss
│   │       └── equipment-attention.component.spec.ts
│   └── models/
│       └── equipment-attention-item.model.ts
```

## Technical Constraints
- Angular 20.3 with standalone components (no NgModules)
- TypeScript strict mode
- SCSS for styling
- Tailwind CSS available
- Angular Material 20.2.11 available
- No backend calls yet - use dummy data in component
- Follow existing code patterns (see `header` component)
- **Terminal**: Use Command Prompt (cmd) for any command-line operations (not PowerShell)

## Testing the Implementation

Access at: **http://127.0.0.1:4200/dashboard** - server is already running inside a docker!

**Note**: If you need to run any terminal commands (e.g., for local development), use **Command Prompt (cmd)** instead of PowerShell. Example commands:
```cmd
cd frontend
npm install
npm start
```

## Additional Notes
- Ensure the component is visually consistent with the provided design description
- Use proper TypeScript types and interfaces
- Follow Angular best practices for component architecture
- Make the component easily testable
- Ensure accessibility (ARIA labels, semantic HTML)
- The component should be responsive and work on different screen sizes

## Acceptance Criteria
- [ ] Dashboard component created and accessible via `/dashboard` route
- [ ] Equipment Attention component displays dummy data correctly
- [ ] Visual design matches specifications (card layout, status badges, typography)
- [ ] Status badges show correct colors (red for critical, yellow/orange for warning)
- [ ] Component is responsive and works on different screen sizes
- [ ] Code follows existing patterns and Angular best practices
- [ ] TypeScript interfaces are properly defined
- [ ] Component is ready for future backend integration
- [ ] No console errors or warnings
- [ ] Component is accessible (ARIA labels, semantic HTML)

## Priority
**High** - Core dashboard feature

## Dependencies
- Angular Material components installed
- Tailwind CSS configured
- Existing header component as reference

