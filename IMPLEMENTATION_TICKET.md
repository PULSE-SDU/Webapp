# Implementation Ticket: Tag List Page with Details Modal

## Project Context
You are working on **PULSE**, a battery life prediction web application for monitoring medical equipment tags at Odense University Hospital. The project uses:
- **Frontend**: Angular 20.3 (standalone components) with Angular Material, Tailwind CSS, and TypeScript
- **Backend**: Django REST Framework (to be implemented later with MySQL)
- **Current State**: Dashboard with Equipment Needing Attention component is implemented; Tag List page needs to be created

## Component Design Requirements

Implement a **Tag List Page** with a **Details Modal/Dialog** feature with the following specifications:

### Visual Design - Tag List Table:

Based on the provided image reference, the tag list page should display a data table with the following columns:

1. **Tag ID**: Unique alphanumeric identifier (e.g., "TAG-008", "TAG-002")
2. **Equipment Name**: Display name of the medical device (e.g., "Ventilator B3", "Syringe Pump E1")
3. **Type**: Equipment category (e.g., "Ventilator", "Syringe Pump", "Pulse Oximeter", "Ultrasound", "Patient Monitor", "Infusion Pump", "ECG Machine", "Defibrillator")
4. **Location**: Physical placement (e.g., "ICU - Room 304", "Emergency - Bay 3", "Radiology - Mobile")
5. **Battery Level**: 
   - Visual: Horizontal progress bar with fill indicating charge level
   - Numerical: Percentage value displayed next to progress bar
   - **Color-coding for Percentage**:
     - **Red**: Critical levels (15-22%)
     - **Orange/Yellow**: Warning levels (38-45%)
     - **Black**: 100% (fully charged)
     - **Dark Grey**: Normal levels (55-92%)
6. **Status**: Pill-shaped badge with text:
   - **Red pill "critical"**: For critical battery levels
   - **Orange/Yellow pill "warning"**: For warning battery levels
   - **Black pill "charging"**: For equipment currently charging (100%)
   - **Dark Grey pill "normal"**: For normal battery levels
7. **Prediction**: Estimated remaining battery life:
   - **Text Content**: "X days remaining" or "Currently charging"
   - **Color-coding for Text**:
     - **Red text**: Short durations (1-2 days)
     - **Orange/Yellow text**: Warning durations (4-5 days)
     - **Black text**: "Currently charging"
     - **Dark Grey text**: Normal durations (6-18 days)
8. **Actions**: Contains a "Details" button (light grey background, dark grey text) that opens the modal

### Visual Design - Details Modal/Dialog:

When the "Details" button is clicked, a modal/dialog should appear displaying comprehensive information about the selected equipment tag. Based on the provided image reference, the modal should have the following structure:

#### Header Section:
- **Title**: "Equipment Details" (large, bold font)
- **Subtitle**: "Detailed information and properties" (smaller, lighter grey font)
- **Close Button**: 'X' icon in the top right corner (dismissible via close button, backdrop click, or ESC key)

#### General Information Section:
- **Layout**: Two-column layout
- **Left Column**:
  - **Tag ID**: Label "Tag ID" with value displayed below in bold (e.g., "TAG-003")
  - **Type**: Label "Type" with value displayed below in bold (e.g., "Patient Monitor")
- **Right Column**:
  - **Equipment Name**: Label "Equipment Name" with value displayed below in bold (e.g., "Patient Monitor C3")
  - **Location**: Label "Location" with value displayed below in bold (e.g., "Emergency - Bay 1")

#### Battery Status Section:
- **Label**: "Battery Status"
- **Visual Elements**:
  - Battery icon (outline style, color-coded based on status: red for critical, orange/yellow for warning, dark grey for normal, black for charging)
  - Percentage display (e.g., "15%") next to the battery icon
  - Horizontal progress bar (light grey background, filled portion color-coded: red for critical, orange/yellow for warning, dark grey for normal, black for charging)
  - Status tag: Pill-shaped badge on the far right of the progress bar (red for "critical", orange/yellow for "warning", dark grey for "normal", black for "charging")

#### Battery Life Prediction Section:
- **Label**: "Battery Life Prediction"
- **Visual Elements**:
  - Gray box/container with calendar icon
  - Prediction text (e.g., "1 day remaining" or "Currently charging")
  - Context text below: "Based on current usage patterns and battery health" (smaller, lighter grey font)
- **Color-coding**: Match the table's prediction color-coding (red for 1-2 days, orange/yellow for 4-5 days, black for charging, dark grey for 6-18 days)

#### Technical Properties Section (Optional):
- **Label**: "Technical Properties"
- **Voltage**: Card-like box with:
  - Lightning bolt icon
  - Label "Voltage" at the top
  - Value displayed below (e.g., "10.5V")
- **Note**: Only Voltage should be included. **Do NOT include**:
  - Temperature
  - Cycle Count
  - Last Maintenance

#### Styling Requirements:
- **Container**: Clean, white background with dark grey text (matching table aesthetic)
- **Rounded corners**: Modal should have rounded corners
- **Sections**: Clear visual separation between sections
- **Color-coding**: Maintain consistent color-coding for Battery Level, Status, and Prediction as in the table
- **Icons**: Use Material Icons or appropriate icon library for battery, calendar, and lightning bolt icons
- **Use Angular Material Dialog components**
- **Responsive design**: Ensure modal works on different screen sizes

### Data Structure:

```typescript
interface EquipmentTag {
  tagId: string;                    // Unique identifier (e.g., "TAG-008")
  equipmentName: string;             // Display name (e.g., "Ventilator B3")
  type: string;                      // Equipment type (e.g., "Ventilator")
  location: string;                   // Location (e.g., "ICU - Room 304")
  batteryLevel: number;              // Battery percentage (0-100)
  status: 'critical' | 'warning' | 'normal' | 'charging'; // Status enum
  prediction: string;                // Prediction text (e.g., "2 days remaining", "Currently charging")
  // Optional technical property for modal/detailed view:
  voltage?: string;                  // Voltage value (e.g., "10.5V")
  // Note: Temperature, Cycle Count, and Last Maintenance fields are NOT included
}
```

### Sample Dummy Data:

```typescript
const dummyTagData: EquipmentTag[] = [
  {
    tagId: 'TAG-003',
    equipmentName: 'Patient Monitor C3',
    type: 'Patient Monitor',
    location: 'Emergency - Bay 1',
    batteryLevel: 15,
    status: 'critical',
    prediction: '1 day remaining',
    voltage: '10.5V'
  },
  {
    tagId: 'TAG-008',
    equipmentName: 'Ventilator B3',
    type: 'Ventilator',
    location: 'ICU - Room 304',
    batteryLevel: 22,
    status: 'critical',
    prediction: '2 days remaining',
    voltage: '11.2V'
  },
  {
    tagId: 'TAG-002',
    equipmentName: 'Syringe Pump E1',
    type: 'Syringe Pump',
    location: 'Emergency - Bay 3',
    batteryLevel: 45,
    status: 'warning',
    prediction: '5 days remaining',
    voltage: '12.8V'
  },
  {
    tagId: 'TAG-015',
    equipmentName: 'Infusion Pump D2',
    type: 'Infusion Pump',
    location: 'ICU - Room 302',
    batteryLevel: 78,
    status: 'normal',
    prediction: '10 days remaining',
    voltage: '13.5V'
  },
  {
    tagId: 'TAG-001',
    equipmentName: 'Defibrillator A1',
    type: 'Defibrillator',
    location: 'Emergency - Bay 2',
    batteryLevel: 100,
    status: 'charging',
    prediction: 'Currently charging',
    voltage: '14.2V'
  }
  // Add more dummy data entries as needed
];
```

## Implementation Requirements

### 1. Create Tag List Page Component
- **Location**: `frontend/src/app/pages/tag-list/tag-list.component.ts` (and `.html`, `.scss`)
- **Type**: Standalone component following existing patterns
- **Imports**: Import necessary Angular Material modules (MatTableModule, MatDialogModule, etc.)
- **Purpose**: Main tag list page displaying equipment in a table format

### 2. Create Tag Details Dialog Component
- **Location**: `frontend/src/app/shared/components/tag-details-dialog/tag-details-dialog.component.ts` (and `.html`, `.scss`)
- **Type**: Reusable standalone component for modal content
- **Data Injection**: Use `MAT_DIALOG_DATA` to receive selected tag data
- **Material Components**: Use `MatDialogModule` and `MatDialogRef` for dialog functionality
- **Styling**: Match the table's visual design within the modal

### 3. Create Models/Interfaces
- **Location**: `frontend/src/app/shared/models/equipment-tag.model.ts`
- **Content**: Define the `EquipmentTag` interface
- **Export**: Export for use across the application

### 4. Update Routing
- **File**: `frontend/src/app/app.routes.ts`
- **Action**: 
  - Remove the redirect for tag-list route
  - Add proper component route pointing to TagListComponent
  - Example: `{ path: 'tag-list', component: TagListComponent }`

### 5. Angular Material Dialog Setup
- **Import MatDialogModule**: In the tag list component
- **Inject MatDialog**: In the tag list component constructor
- **Open Dialog Method**: Create method to open dialog when "Details" button is clicked
- **Pass Data**: Pass the selected row's `EquipmentTag` data to the dialog component
- **Reference**: https://material.angular.dev/components/dialog

### 6. Table Implementation
- **Use MatTableModule**: For the data table structure
- **Columns**: Define all columns (Tag ID, Equipment Name, Type, Location, Battery Level, Status, Prediction, Actions)
- **Sorting**: Table headers should show sort indicators (up/down arrows) for sortable columns (Equipment Name, Battery Level, Prediction) - sorting functionality itself is out of scope
- **Styling**: 
  - Custom styling for progress bars (battery level)
  - Custom styling for status badges (pill-shaped)
  - Color-coding as specified above

### 7. Styling Guidelines
- Use Tailwind CSS utility classes where appropriate
- Leverage Angular Material theming (already configured with cyan primary, orange tertiary)
- Follow the existing design system (see `equipment-attention` component for reference)
- Ensure responsive design
- **Color Specifications**:
  - Critical (Red): `#ef4444` or Material red palette
  - Warning (Orange/Yellow): `#f59e0b` or Material orange palette
  - Normal (Dark Grey): `#6b7280` or Material grey palette
  - Charging (Black): `#000000` or Material black
  - Background (White): `#ffffff`
  - Text (Dark Grey): `#374151`

### 8. Backend Compatibility
- Structure the component to easily accept data from HTTP service calls
- Use dummy data in component for now
- Prepare for future service injection pattern:
  ```typescript
  // Future-ready structure:
  constructor(private tagService: TagService, private dialog: MatDialog) {}
  
  ngOnInit() {
    // Will be: this.tagService.getAllTags().subscribe(...)
    // For now: use dummy data
  }
  ```
- Ensure data structure matches what MySQL/Django REST will provide (JSON format)

### 9. Angular Material Components to Use
- `MatTableModule` for the data table
- `MatDialogModule` for the modal/dialog
- `MatButtonModule` for the Details button
- `MatProgressBarModule` for battery level visualization (optional, or custom progress bar)
- `MatChipsModule` for status badges (optional, or use custom badges)
- `MatIconModule` for icons if needed
- Reference: https://material.angular.dev/components/categories

## File Structure to Create

```
frontend/src/app/
├── pages/
│   └── tag-list/
│       ├── tag-list.component.ts
│       ├── tag-list.component.html
│       ├── tag-list.component.scss
│       └── tag-list.component.spec.ts
├── shared/
│   ├── components/
│   │   └── tag-details-dialog/
│   │       ├── tag-details-dialog.component.ts
│   │       ├── tag-details-dialog.component.html
│   │       ├── tag-details-dialog.component.scss
│   │       └── tag-details-dialog.component.spec.ts
│   └── models/
│       └── equipment-tag.model.ts
```

## Technical Constraints
- Angular 20.3 with standalone components (no NgModules)
- TypeScript strict mode
- SCSS for styling
- Tailwind CSS available
- Angular Material 20.2.11 available
- No backend calls yet - use dummy data in component
- Follow existing code patterns (see `equipment-attention` component)
- **Terminal**: Use Command Prompt (cmd) for any command-line operations (not PowerShell)
- **No Filtering**: Filtering feature will be implemented by another team member - do not implement any filtering functionality

## Pull Request Requirements

### Continuous Integration (CI) Checks

**All CI checks must pass successfully before the pull request can be merged:**

1. **Django CI Check** (`CI / Django (3.14) (pull_request)`):
   - Runs on Python 3.14
   - Executes `pylint` for code quality checks
   - Runs Django test suite (`python manage.py test`)
   - **Requirement**: All Django CI checks must pass
   - **Note**: Since this is a frontend-only ticket, ensure no backend code changes break existing Django tests

2. **Angular CI Check** (`CI / Angular (pull_request)`):
   - Runs on Node.js 20
   - Executes format check (`npm run format:check`) - **Prettier formatting validation**
   - Runs linting (`npm run lint`) - **ESLint validation**
   - Builds the Angular application (`npm run build`)
   - **Requirement**: All Angular CI checks must pass

### Format Check Requirements

**Code formatting must comply with project standards:**

1. **Prettier Formatting**:
   - Run `npm run format:check` in the `frontend` directory before committing
   - All TypeScript, JavaScript, JSON, Markdown, SCSS, and HTML files must be properly formatted
   - Prettier configuration:
     - Print width: 100 characters
     - Single quotes: enabled
     - Angular HTML parser for `.html` files
   - **Action**: If format check fails, run `npm run format` to auto-fix formatting issues

2. **ESLint Validation**:
   - Run `npm run lint` in the `frontend` directory
   - All code must pass ESLint rules
   - **Action**: Fix any linting errors before committing

3. **Pre-commit Checklist**:
   - [ ] Run `npm run format:check` - ensure it passes
   - [ ] Run `npm run lint` - ensure it passes
   - [ ] Run `npm run build` - ensure build succeeds
   - [ ] Verify all new files follow project formatting standards
   - [ ] Ensure no console errors or warnings in development

### CI Workflow Details

The CI workflow (`.github/workflows/ci.yml`) automatically runs on pull requests and includes:

**Backend CI (Django)**:
- Python 3.14 setup
- Dependency installation via Pipenv
- Pylint code quality checks
- Django test execution

**Frontend CI (Angular)**:
- Node.js 20 setup
- Dependency installation
- Prettier format checking
- ESLint linting
- Angular build verification

**All checks must show as "Success" (or "Succ") in the pull request before merging.**

## Testing the Implementation

Access at: **http://127.0.0.1:4200/tag-list** - server is already running inside a docker!

**Note**: If you need to run any terminal commands (e.g., for local development), use **Command Prompt (cmd)** instead of PowerShell. Example commands:
```cmd
cd frontend
npm install
npm start
```

**Before submitting a pull request, verify locally:**
```cmd
cd frontend
npm run format:check
npm run lint
npm run build
```

## Additional Notes
- Ensure the component is visually consistent with the provided design description
- Use proper TypeScript types and interfaces
- Follow Angular best practices for component architecture
- Make the component easily testable
- Ensure accessibility (ARIA labels, semantic HTML)
- The component should be responsive and work on different screen sizes
- Modal should be dismissible via close button, backdrop click, or ESC key (default MatDialog behavior)

## Acceptance Criteria
- [ ] Tag List component created and accessible via `/tag-list` route
- [ ] Table displays all required columns with dummy data
- [ ] Battery Level column shows progress bar with color-coded percentage
- [ ] Status column shows pill-shaped badges with correct colors
- [ ] Prediction column shows color-coded text
- [ ] "Details" button in Actions column is functional
- [ ] Clicking "Details" opens a modal/dialog
- [ ] Modal displays detailed information about the selected tag
- [ ] Modal includes all table data plus additional dummy fields
- [ ] Color-coding is consistent between table and modal
- [ ] Modal can be closed via close button, backdrop click, or ESC key
- [ ] Component is responsive and works on different screen sizes
- [ ] Code follows existing patterns and Angular best practices
- [ ] TypeScript interfaces are properly defined
- [ ] Component is ready for future backend integration
- [ ] No console errors or warnings
- [ ] Component is accessible (ARIA labels, semantic HTML)
- [ ] No filtering functionality is implemented (as per requirements)
- [ ] **All CI checks pass (Django and Angular)**
- [ ] **Code formatting passes Prettier checks**
- [ ] **Code passes ESLint validation**
- [ ] **Angular build succeeds without errors**

## Priority
**High** - Core feature for equipment monitoring

## Dependencies
- Angular Material components installed
- Tailwind CSS configured
- Existing components as reference (equipment-attention, dashboard)

## Scope Exclusions
- **No Backend Implementation**: This ticket is strictly for frontend development
- **No Filtering Feature**: Filtering functionality will be implemented by another team member and should not be included in this scope

---

## Advanced Prompt for Sonnet 4.5

You are an expert Angular frontend developer. The user is implementing a battery life prediction web app called **PULSE** for monitoring medical equipment tags at Odense University Hospital. Your task is to guide them in implementing a **"Tag details with popup/modal/dialogue"** feature for the tag list page.

### Image Description & Context

The provided image displays a data table (the "tag list page") for monitoring medical equipment. Each row represents a piece of equipment with the following columns:

1. **Tag ID**: Unique alphanumeric identifier (e.g., "TAG-008", "TAG-002")
2. **Equipment Name**: Device name (e.g., "Ventilator B3", "Syringe Pump E1")
3. **Type**: Equipment category (e.g., "Ventilator", "Syringe Pump", "Pulse Oximeter")
4. **Location**: Physical placement (e.g., "ICU - Room 304", "Emergency - Bay 3")
5. **Battery Level**: 
   - Visual progress bar with percentage
   - **Color-coding**: Red (15-22% critical), Orange/Yellow (38-45% warning), Black (100% charging), Dark Grey (55-92% normal)
6. **Status**: Pill-shaped badge:
   - Red pill "critical" (for critical battery)
   - Orange/Yellow pill "warning" (for warning battery)
   - Black pill "charging" (for 100% battery)
   - Dark Grey pill "normal" (for normal battery)
7. **Prediction**: Text showing "X days remaining" or "Currently charging"
   - **Color-coding**: Red (1-2 days), Orange/Yellow (4-5 days), Black (charging), Dark Grey (6-18 days)
8. **Actions**: Contains a light grey "Details" button with dark grey text

The table has 12 rows of data visible, with sort indicators on Equipment Name, Battery Level, and Prediction columns (sorting functionality is out of scope).

### User's Goal

Implement the frontend for the **"Tag details with popup/modal/dialogue"** feature. When a user clicks the "Details" button in the Actions column, a modal/dialog should appear displaying comprehensive information about that specific equipment tag.

**Modal Structure** (based on provided image):
- Header with "Equipment Details" title and subtitle
- General Information section (Tag ID, Equipment Name, Type, Location in two columns)
- Battery Status section (battery icon, percentage, progress bar, status tag)
- Battery Life Prediction section (calendar icon, prediction text, context text)
- Technical Properties section (only Voltage - do NOT include Temperature, Cycle Count, or Last Maintenance)

### Technical Context

- **Framework**: Angular 20.3 with standalone components (no NgModules)
- **UI Library**: Angular Material 20.2.11 (https://material.angular.dev/components/categories)
- **Styling**: Tailwind CSS + SCSS
- **TypeScript**: Strict mode
- **Current State**: 
  - Dashboard page exists with Equipment Needing Attention component
  - Tag List route exists but redirects (needs implementation)
  - Header navigation includes "Tag List" tab
- **Patterns to Follow**: See `equipment-attention` component for styling/architecture patterns

### Constraints & Requirements

1. **Frontend Only**: No backend implementation required; use dummy data
2. **MySQL Compatibility**: Structure data models to be compatible with future MySQL/Django REST backend
3. **No Filtering**: Do not implement any filtering features (another team member will handle this)
4. **Angular Material Dialog**: Use `MatDialogModule` for the modal implementation
5. **Dummy Data**: Use dummy data for both table and modal content initially
6. **CI Requirements**: Code must pass all CI checks:
   - Django CI (pylint, tests)
   - Angular CI (format check, lint, build)
   - Prettier formatting validation
   - ESLint validation

### Implementation Tasks

Provide detailed guidance and code snippets for:

#### 1. **Data Model Structure**
Create a TypeScript interface `EquipmentTag` that includes:
- All table column fields (tagId, equipmentName, type, location, batteryLevel, status, prediction)
- Optional field for detailed modal view: `voltage?: string` (e.g., "10.5V")
- **Important**: Do NOT include Temperature, Cycle Count, or Last Maintenance fields
- Ensure types are compatible with future JSON API responses

#### 2. **Tag List Component Setup**
- Create `tag-list.component.ts` as a standalone component
- Import necessary Angular Material modules (`MatTableModule`, `MatDialogModule`, `MatButtonModule`, etc.)
- Set up dummy data array
- Inject `MatDialog` service in constructor
- Create method to open dialog when "Details" button is clicked

#### 3. **Table Implementation**
- Use `MatTableModule` to create the data table
- Define all 8 columns (Tag ID, Equipment Name, Type, Location, Battery Level, Status, Prediction, Actions)
- Implement custom cell templates for:
  - Battery Level: Progress bar with color-coded percentage
  - Status: Pill-shaped badge with color-coding
  - Prediction: Color-coded text
  - Actions: "Details" button
- Apply color-coding rules as specified above
- Ensure responsive design

#### 4. **Dialog Component Creation**
- Create `tag-details-dialog.component.ts` as a standalone component
- Import `MatDialogModule`, `MAT_DIALOG_DATA`, and `MatDialogRef`
- Inject `MAT_DIALOG_DATA` to receive selected tag data
- Structure the component to display:
  - **Header**: "Equipment Details" title with "Detailed information and properties" subtitle, and close button (X)
  - **General Information Section**: Two-column layout with Tag ID, Equipment Name, Type, Location
  - **Battery Status Section**: Battery icon, percentage, progress bar, and status tag (pill-shaped badge)
  - **Battery Life Prediction Section**: Calendar icon, prediction text, and context text ("Based on current usage patterns and battery health")
  - **Technical Properties Section (Optional)**: Only Voltage field with lightning bolt icon (do NOT include Temperature, Cycle Count, or Last Maintenance)
  - Maintain consistent color-coding for battery level, status, and prediction

#### 5. **Opening the Dialog**
- In tag list component, create `openDetailsDialog(tag: EquipmentTag)` method
- Use `MatDialog.open()` to open the dialog
- Pass the selected tag data via `data` property
- Configure dialog options (width, maxWidth, etc.)

#### 6. **Styling Implementation**
- Match the clean, white-background aesthetic from the image
- Implement color-coding:
  - Critical: `#ef4444` (red)
  - Warning: `#f59e0b` (orange/yellow)
  - Normal: `#6b7280` (dark grey)
  - Charging: `#000000` (black)
- Create custom progress bar styling for battery level
- Style pill-shaped status badges
- Ensure modal styling is consistent with table design
- Use Tailwind CSS utilities where appropriate
- Follow existing component patterns (see `equipment-attention.component.scss`)

#### 7. **Routing Update**
- Update `app.routes.ts` to add proper route for TagListComponent
- Remove the redirect for `/tag-list` path

#### 8. **Code Quality & CI Compliance**
- Ensure all code follows Prettier formatting rules (100 char width, single quotes)
- Run `npm run format:check` to verify formatting
- Ensure all code passes ESLint validation (`npm run lint`)
- Verify Angular build succeeds (`npm run build`)
- Ensure no TypeScript errors or warnings
- Follow existing code patterns and conventions

### Code Structure Example

Provide code snippets showing:
- Interface definition for `EquipmentTag`
- Tag list component with table setup
- Dialog component structure
- Method to open dialog with data passing
- HTML templates for both components
- SCSS styling for color-coding and visual elements

### Key Considerations

- **Modularity**: Keep components reusable and maintainable
- **Type Safety**: Use proper TypeScript types throughout
- **Accessibility**: Include ARIA labels and semantic HTML
- **Responsive Design**: Ensure table and modal work on different screen sizes
- **Future-Ready**: Structure code to easily integrate HTTP services later
- **Consistency**: Match existing code patterns and design system
- **CI Compliance**: Ensure all code passes format checks, linting, and builds successfully

Focus on clear, production-ready Angular code that follows best practices, passes all CI checks, and is ready for future backend integration.
