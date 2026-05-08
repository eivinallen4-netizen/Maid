# Mountain Springs Cleaning · Admin Dashboard Design Spec
> Design Phase: Redesign v1
> Context: Professional admin panel for Las Vegas cleaning service business
> Date: 2026-05-07

---

## 🎯 Brand Context

**Business**: Mountain Springs Cleaning  
**Service**: Residential cleaning, short-term rentals, move-in/move-out  
**Location**: Las Vegas, NV  
**Positioning**: Local, background-checked, insured, professional, reliable  

**Audience for Admin Panel**: 
- Business owner (Theodore)
- Operations managers
- Customer service reps
- Schedulers

**What This Tool Does**:
- Manage quotes and conversions
- Schedule jobs and technicians
- Track pricing and add-ons
- Email customer communications
- Review customer data
- Monitor business operations

---

## 🎨 Current State Analysis

### Strengths
✅ Clean dark sidebar with good contrast  
✅ Organized navigation with section groups  
✅ Responsive design (desktop sidebar + mobile bottom nav)  
✅ Good use of icons for visual scanning  

### Weaknesses
❌ Generic dark admin template (could be any business)  
❌ Branding says "PureBin LV" (outdated, should be Mountain Springs)  
❌ No visual brand identity (colors, typography, logo)  
❌ Sidebar color (#111827) is harsh dark gray, not warm/welcoming  
❌ Missing the "local, professional" brand feeling  
❌ Generic gradient icon (indigo + sky) doesn't match brand  
❌ Tab organization could be more logical for daily workflows  

---

## 📋 Current Color Palette

```
page:        #f9fafb    (near-white background)
sidebar:     #111827    (harsh dark gray)
card:        #ffffff    (white)
border:      #1f2937    (medium gray)
textMuted:   #9ca3af    (light gray)
indigo:      #6366f1    (generic purple)
sky:         #0ea5e9    (generic cyan)
```

**Problem**: This is the exact color palette of 10,000 generic SaaS admin dashboards. Not memorable, not brandable.

---

## ✨ Design Opportunities

### 1. Brand Color System
Need to establish Mountain Springs colors that:
- Convey professional, trustworthy service
- Feel warm and local (Las Vegas context)
- Differentiate from competitors
- Work for both light and dark modes

**Suggested direction**: Warm professional palette
- Primary: Deep teal or forest green (trust, stability)
- Secondary: Warm rust or terracotta (local, warm)
- Accent: Clean white
- Supporting: Warm grays/beige

### 2. Logo & Branding
- Add Mountain Springs Cleaning logo to sidebar
- Consider a small icon/mark (mountain + water + cleaning)
- Make the brand unmistakable at a glance

### 3. Navigation Architecture
Current tabs seem scattered. Could organize by:
- **DAILY OPERATIONS**: Quotes, Jobs, Schedule
- **CUSTOMER MANAGEMENT**: Customers, Reviews, Communications
- **BUSINESS SETUP**: Pricing, Services, Settings
- **TEAM**: Users, Roles, Permissions

### 4. Visual Hierarchy Improvements
- Larger, bolder main section titles
- Better spacing between content sections
- Cards that breathe more
- More prominent CTAs (action buttons)

### 5. Card/Component Design
- Upgrade from plain white cards to layered design
- Add status badges with brand colors
- Better visual feedback on interactions
- Subtle shadows and depth

---

## 🎨 Proposed Color Directions

### Option A: Forest Professional
```
Primary:     #1B4D3E    (forest green - trust, growth)
Secondary:   #C04A1A    (rust orange - warmth, reliability)
Accent:      #F0F4F0    (off-white - clean)
Supporting:  #4A5D57    (warm gray)
Background:  #F5F5F3    (warm off-white)
```
*Vibe*: Professional, natural, trustworthy. Feels established and local.

### Option B: Coastal Clean
```
Primary:     #0D6B7E    (teal - water, cleanliness)
Secondary:   #D97706    (amber - warmth, energy)
Accent:      #FFFFFF    (pure white - clean)
Supporting:  #6B7280    (neutral gray)
Background:  #F9FAFB    (cool off-white)
```
*Vibe*: Fresh, clean, modern. Emphasizes the "water/cleaning" connection.

### Option C: Desert Luxury
```
Primary:     #5D4E37    (warm brown - earth, stability)
Secondary:   #D4A373    (warm tan - approachable, premium)
Accent:      #FFFFFF    (white - refinement)
Supporting:  #8B7355    (warm gray)
Background:  #F5EFE7    (warm cream)
```
*Vibe*: Premium, local Las Vegas (desert tones), upscale but approachable.

---

## 📐 Layout Improvements

### Sidebar Enhancement
```
[Logo & Brand Name - left aligned, larger]
[Tagline: "Operations Hub" or "Dashboard"]
[Spacer]
[DAILY OPERATIONS]
[button: Quotes]
[button: Jobs]
[button: Schedule]
[spacer]
[CUSTOMER DATA]
[button: Customers]
[button: Communications]
[spacer]
[SETUP]
[button: Pricing]
[button: Services]
[button: Settings]
[spacer - fill]
[footer: Location, Service type, Status]
```

### Main Content Area
- Larger section headers with brand color accent bar
- Better visual separation between subsections
- Cards with brand accent borders or top stripe
- Action buttons with clear color hierarchy

---

## 🎯 Design Goals for Redesign

1. **Brand Recognition**: Should feel uniquely "Mountain Springs" not generic
2. **Professional Trust**: Colors and design should convey reliability
3. **Daily Usability**: Better organized for actual workflows
4. **Visual Hierarchy**: Clear what's important and what's secondary
5. **Warmth**: Feel inviting, not cold/corporate
6. **Efficiency**: Quick scanning, logical grouping

---

## 📊 Implementation Priority

**Tier 1 (High Impact, Quick)**:
- Update sidebar color to chosen brand color
- Fix branding (logo, company name)
- Update primary accent color throughout
- Better typography hierarchy

**Tier 2 (Medium Impact)**:
- Reorganize navigation sections
- Redesign cards with brand accent stripes
- Add status indicators with brand colors
- Improve spacing and breathing room

**Tier 3 (Polish)**:
- Custom icons/illustrations
- Subtle animations
- Dark mode variant
- Logo variations

---

## 🎨 Next Steps

1. Approve color direction (A / B / C or custom)
2. Confirm brand name and logo approach
3. Review navigation reorganization
4. Implement Tier 1 visual changes
5. Iterate on card designs and details
