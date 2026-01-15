export const projects = [
  {
    id: 1,
    title: "Saravananpatti Tittelpark Excavation",
    location: "Saravananpatti, Tamil Nadu",
    equipment: ["JCB 220 LC Xtra", "Caterpillar 320", "Komatsu PC210"],
    images: ["/assets/BasementExcavation.png"],
    date: "2024",
    description: "Comprehensive basement excavation for the Tittelpark development project, involving deep digging and soil removal for foundation work",
    client: "Tittelpark Developers",
    duration: "8 months"
  },
  {
    id: 2,
    title: "Saravananpatti Tittelpark Demolition",
    location: "Saravananpatti, Tamil Nadu",
    equipment: ["Caterpillar 320", "JCB 3DX Super", "Hydraulic Breaker"],
    images: ["/assets/BuildinDemolition.png"],
    date: "2024",
    description: "Controlled demolition of existing structures at Tittelpark site, ensuring safe removal and debris management",
    client: "Tittelpark Developers",
    duration: "3 months"
  },
  {
    id: 3,
    title: "Sand Mining Excavation Project",
    location: "NH 45A Highway, Tamil Nadu",
    equipment: ["Motor Grader", "Soil Compactor", "Ashok Leyland Tipper", "Volvo L90H"],
    images: ["/assets/SandMiningExcavation.jpg"],
    date: "2023-2024",
    description: "Sand mining and excavation operations for construction materials, including earthmoving and material handling",
    client: "Tamil Nadu Highways Department",
    duration: "12 months"
  },
  {
    id: 4,
    title: "Stone Mining Excavation Project",
    location: "Various Locations, Tamil Nadu",
    equipment: ["JCB 220 LC Xtra", "Caterpillar 950M", "Rock Breaker", "Dump Trucks"],
    images: ["/assets/StoneMiningExcavation.jpg"],
    date: "2023-2024",
    description: "Stone mining and quarrying operations for construction aggregates and building materials",
    client: "Multiple Construction Companies",
    duration: "Ongoing"
  },
  {
    id: 5,
    title: "Pipeline Infrastructure Project",
    location: "Multiple Locations, Tamil Nadu",
    equipment: ["Trenching Machine", "Pipe Layer", "Backhoe Loader", "Welding Equipment"],
    images: ["/assets/PipelineInfrastructure.jpg"],
    date: "2023-2024",
    description: "Installation and maintenance of underground pipeline infrastructure for water and utility services",
    client: "Tamil Nadu Water Supply Board",
    duration: "15 months"
  }
];

export const projectFilters = [
  { id: 'all', name: 'All Projects' },
  { id: 'excavation', name: 'Excavation Projects' },
  { id: 'demolition', name: 'Demolition Projects' },
  { id: 'mining', name: 'Mining Projects' },
  { id: 'infrastructure', name: 'Infrastructure Projects' }
];