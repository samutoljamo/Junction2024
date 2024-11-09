// mockData.ts
export const mockItems = [
  {
    id: "1",
    equipmentName: "Air Handler Unit 1",
    x: 123.45,
    y: 67.89,
    floor: 1,
    manufacturer: "Carrier",
    model: "AHU-2000",
    serialNumber: "CAR123456",
    equipmentType: "HVAC",
    size: "Large",
    material: "Steel",
    manufacturingYear: 2020,
    pictures: [
      {
        data: "base64string...",
        id: 1
      }
    ],
    visits: [
      {
        condition: "Good",
        notes: "Annual maintenance completed",
        createdAt: "2024-01-15",
        surveyor: "John Smith"
      },
      {
        condition: "Fair",
        notes: "Filter replacement needed",
        createdAt: "2024-02-20",
        surveyor: "Jane Doe"
      }
    ]
  },
  {
    id: "2",
    equipmentName: "Chiller Unit 3",
    x: 234.56,
    y: 78.90,
    floor: 2,
    manufacturer: "Trane",
    model: "CH-500",
    serialNumber: "TRN789012",
    equipmentType: "Cooling",
    size: "Medium",
    material: "Aluminum",
    manufacturingYear: 2021,
    pictures: [
      {
        data: "base64string...",
        id: 2
      }
    ],
    visits: [
      {
        condition: "Excellent",
        notes: "New installation verification",
        createdAt: "2024-01-10",
        surveyor: "Mike Johnson"
      }
    ]
  },
  {
    id: "3",
    equipmentName: "Boiler System B",
    x: 345.67,
    y: 89.01,
    floor: 1,
    manufacturer: "Viessmann",
    model: "B-1000",
    serialNumber: "VS345678",
    equipmentType: "Heating",
    size: "Large",
    material: "Cast Iron",
    manufacturingYear: 2019,
    pictures: [],
    visits: [
      {
        condition: "Fair",
        notes: "Pressure valve replacement recommended",
        createdAt: "2024-01-05",
        surveyor: "Sarah Wilson"
      },
      {
        condition: "Good",
        notes: "Valve replaced, system operating normally",
        createdAt: "2024-02-15",
        surveyor: "Sarah Wilson"
      },
      {
        condition: "Good",
        notes: "Quarterly inspection completed",
        createdAt: "2024-03-01",
        surveyor: "Mike Johnson"
      }
    ]
  }
];

// Mock Redux store state
export const mockState = {
  backend: {
    items: mockItems
  }
};
