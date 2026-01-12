import jcb3dx from '../assets/Jcb 3dx super.jpg';
import jcb220 from '../assets/JCB 220 LC Xtra.jpg';
import cat320 from '../assets/Caterpillar 320.jpg';
import komatsu210 from '../assets/Komatsu PC210.jpg';
import volvoL90 from '../assets/Volvo L90H.jpg';
import cat950 from '../assets/Caterpillar 950M.jpg';
import ashokLeyland from '../assets/Ashok Leyland 2516.jpg';
import bharatBenz from '../assets/BharatBenz 2823.png';
import motorGrader from '../assets/Motor Grader.jpg';
import soilCompactor from '../assets/Soil Compactor volvo.jpg';
import concreteMixer from '../assets/Concrete Mixer.jpg';
import plan from '../assets/Plan.png';

export const fleetData = [
  {
    id: 1,
    name: "JCB 3DX Super",
    units: 8,
    category: "Excavator",
    hourlyRate: 1400,
    specs: [
      "Bucket Capacity: 1.0 cum",
      "Engine Power: 76 HP",
      "Max Dig Depth: 4.1m",
      "Operating Weight: 7500 kg"
    ],
    features: ["Breaker Attachment Available", "AC Cabin", "GPS Enabled", "Quick Coupler"],
    image: jcb3dx
  },
  {
    id: 2,
    name: "JCB 220 LC Xtra",
    units: 6,
    category: "Excavator",
    hourlyRate: 1600,
    specs: [
      "Bucket Capacity: 1.2 cum",
      "Engine Power: 130 HP",
      "Max Dig Depth: 6.5m",
      "Operating Weight: 22000 kg"
    ],
    features: ["Long Reach", "Rock Breaker", "Climate Control", "Advanced Hydraulics"],
    image: jcb220
  },
  {
    id: 3,
    name: "Caterpillar 320",
    units: 4,
    category: "Excavator",
    hourlyRate: 1800,
    specs: [
      "Bucket Capacity: 1.4 cum",
      "Engine Power: 150 HP",
      "Max Dig Depth: 7.2m",
      "Operating Weight: 21000 kg"
    ],
    features: ["Advanced Monitor", "Eco Mode", "Auto Greasing", "Heavy Duty"],
    image: cat320
  },
  {
    id: 4,
    name: "Komatsu PC210",
    units: 5,
    category: "Excavator",
    hourlyRate: 1700,
    specs: [
      "Bucket Capacity: 1.3 cum",
      "Engine Power: 140 HP",
      "Max Dig Depth: 6.8m",
      "Operating Weight: 21500 kg"
    ],
    features: ["Fuel Efficient", "Low Maintenance", "Comfort Seat", "LED Lights"],
    image: komatsu210
  },
  {
    id: 5,
    name: "Volvo L90H",
    units: 7,
    category: "Loader",
    hourlyRate: 1200,
    specs: [
      "Bucket Capacity: 2.8 cum",
      "Engine Power: 180 HP",
      "Breakout Force: 170 kN",
      "Operating Weight: 16000 kg"
    ],
    features: ["Quick Shift", "Ride Control", "High Lift", "Advanced Display"],
    image: volvoL90
  },
  {
    id: 6,
    name: "Caterpillar 950M",
    units: 4,
    category: "Loader",
    hourlyRate: 1300,
    specs: [
      "Bucket Capacity: 3.1 cum",
      "Engine Power: 200 HP",
      "Breakout Force: 185 kN",
      "Operating Weight: 18500 kg"
    ],
    features: ["Power Shift", "Enhanced Vision", "Auto Lube", "Service Indicators"],
    image: cat950
  },
  {
    id: 7,
    name: "Ashok Leyland 2516",
    units: 12,
    category: "Truck",
    hourlyRate: 800,
    specs: [
      "Load Capacity: 16 Tons",
      "Engine Power: 180 HP",
      "Body Type: Tipper",
      "GVW: 25160 kg"
    ],
    features: ["Power Steering", "AC Cabin", "Dual Air Brakes", "Heavy Duty Chassis"],
    image: ashokLeyland
  },
  {
    id: 8,
    name: "BharatBenz 2823",
    units: 8,
    category: "Truck",
    hourlyRate: 900,
    specs: [
      "Load Capacity: 23 Tons",
      "Engine Power: 230 HP",
      "Body Type: Tipper",
      "GVW: 28200 kg"
    ],
    features: ["Comfort Cabin", "Fuel Efficient", "High Torque", "Service Network"],
    image: bharatBenz
  },
  {
    id: 9,
    name: "Tata Hydra Crane",
    units: 3,
    category: "Crane",
    hourlyRate: 2500,
    specs: [
      "Lifting Capacity: 20 Tons",
      "Boom Length: 24m",
      "Engine Power: 160 HP",
      "Type: Truck Mounted"
    ],
    features: ["Power Telescoping", "Safe Load Indicator", "360 Rotation", "Outriggers"],
    image: plan
  },
  {
    id: 10,
    name: "Motor Grader",
    units: 2,
    category: "Grader",
    hourlyRate: 1500,
    specs: [
      "Blade Length: 3.6m",
      "Engine Power: 150 HP",
      "Operating Weight: 14000 kg",
      "Grade Ability: 30°"
    ],
    features: ["All Wheel Drive", "Automatic Controls", "Circle Side Shift", "Comfort Cabin"],
    image: motorGrader
  },
  {
    id: 11,
    name: "Soil Compactor",
    units: 5,
    category: "Compactor",
    hourlyRate: 1100,
    specs: [
      "Drum Width: 2.1m",
      "Engine Power: 130 HP",
      "Operating Weight: 12000 kg",
      "Vibration Frequency: 2800 vpm"
    ],
    features: ["Double Drum", "Amplitude Control", "Water Sprinkler", "Excellent Visibility"],
    image: soilCompactor
  },
  {
    id: 12,
    name: "Concrete Mixer",
    units: 10,
    category: "Mixer",
    hourlyRate: 600,
    specs: [
      "Capacity: 7 cum",
      "Engine Power: 100 HP",
      "Mixing Speed: 15 rpm",
      "Discharge Time: 8 min"
    ],
    features: ["Hydraulic Operation", "Water Tank", "Durable Drum", "Easy Maintenance"],
    image: concreteMixer
  }
];

export const categories = [
  { id: 'all', name: 'All Equipment' },
  { id: 'excavator', name: 'Excavators' },
  { id: 'loader', name: 'Loaders' },
  { id: 'truck', name: 'Trucks' },
  { id: 'crane', name: 'Cranes' },
  { id: 'grader', name: 'Graders' },
  { id: 'compactor', name: 'Compactors' },
  { id: 'mixer', name: 'Mixers' },
];