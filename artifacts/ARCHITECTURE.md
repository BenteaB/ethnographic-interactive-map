# Project Architecture & Implementation Guide

This document provides a high-level overview of the architectural decisions, design principles, and technical implementation of the Ethnographic Interactive Map.

---

## 🏗️ Core Principles

The project follows a **Declarative & Functional** approach to web development, prioritizing state predictability and component reusability.

### 1. Declarative UI (React 19)
We use React as a declarative framework. Instead of manually manipulating the DOM (Imperative), we define the "Final State" based on data, and React handles the transitions. This is critical for the map, where clicking a region changes multiple UI elements (Map highlight, Info Panel content, Mobile Modal).

### 2. Functional Programming (FP)
Most logic is implemented using pure functions (e.g., `getFeatureStyle` in `LeafletRegionMap.tsx` and the transformation logic in `romaniaGeo.ts`).
- **Immutability**: Data is treated as read-only. We transform data rather than modifying it in place.
- **Predictability**: Given the same inputs, these functions always return the same output, making them easy to test and debug.

### 3. Separation of Concerns (SoC)
The project is divided into distinct layers:
- **Data Layer (`data/`)**: Pure static JSON and GeoJSON assets.
- **Library Layer (`src/lib/`)**: Logic for data parsing, transformation, and validation.
- **Component Layer (`src/components/`)**: Pure UI orchestration (Map, Panel).
- **Page Layer (`src/app/`)**: High-level state management and layout.

---

## 🛠️ Tech Stack & Rationale

### **Next.js 15 (App Router)**
- **Why**: Provides a robust foundation for React with built-in routing, SEO optimization, and an efficient build system.
- **Usage**: Handles the main layout and serves as the orchestrator for the application's lifecycle.

### **Leaflet & React Leaflet**
- **Why**: Industry standard for interactive maps. It's lightweight, battle-tested, and handles complex GeoJSON overlays efficiently.
- **Usage**: Renders the realistic Romania basemap and manages the subzone/county interaction logic.

### **Zod (Schema Validation)**
- **Why**: Standardizes the "Bridge" between raw JSON data and TypeScript. 
- **Rationale**: We use Zod to validate external data at runtime. If a JSON file is corrupted or missing a field, the app fails gracefully with a clear error instead of a generic "Cannot read property of undefined."
- **Inference**: We use `z.infer` to automatically derive TypeScript types from schemas, ensuring they are always in sync.

### **Radix UI**
- **Why**: Provides unstyled, accessible UI primitives (Tabs, Dialog).
- **Rationale**: Accessibility is a first-class citizen. Radix handles keyboard navigation, screen reader support (ARIA), and focus management out of the box.

---

## 🗺️ Data Strategy

### **GeoJSON Overlays**
The map uses a "Two-Tier" GeoJSON strategy:
1.  **Administrative Boundaries**: We use an official `romania-adm1` GeoJSON for precise county borders.
2.  **Ethnographic Mapping**: We map these administrative boundaries to ethnographic macro-regions (Transilvania, Banat, etc.) in `src/lib/romaniaGeo.ts`.

### **Static Content System**
Content is stored in separate JSON files per region. This allows for:
- **Scalability**: Adding a new region is as simple as adding a new JSON file.
- **Maintainability**: Content editors can update text without touching the React code.

---

## 🎨 Styling Strategy (CSS Modules & Tokens)

We use **Vanilla CSS with CSS Modules** for scoping and **CSS Variables** for theming.
- **Performance**: Zero runtime overhead compared to CSS-in-JS.
- **Scalability**: All design tokens (colors, weights, opacities) are centralized in `globals.css`. Changing the map's "Active" color or border thickness is a single-line CSS update.
- **Maintainability**: Styles are co-located with their components, preventing "Global CSS leakage."

---

## 🔄 Interaction Flow

1.  **Event Capture**: User clicks a subzone in `LeafletRegionMap`.
2.  **State Update**: `onSelectRegion` is called, updating `selectedRegionId` and `selectedContext` in `HomePage`.
3.  **Reactive Flow**:
    - `LeafletRegionMap` re-renders with new styles (memoized via `useCallback`).
    - `RegionPanel` re-renders with specific content fetched via `getRegionContent`.
    - If on mobile, the Radix `Dialog` overlay is triggered.
4.  **Deselection**: Clicking the map background or the "Back to map" button resets the state to `null`, re-activating the macro-region hover discovery mode.
