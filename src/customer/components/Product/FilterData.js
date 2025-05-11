export const color = [
  "White",
  "Black",
  "Red",
  "Marun",
  "Pink",
  "Green",
  "Green",
  "Yellow",
];

export const filters = [
  {
    id: "color",
    name: "Color",
    options: [
        {value: "white", label: "White"},
        {value: "beige", label: "Beige"},
        {value: "blue", label: "Blue"},
        {value: "brown", label: "Brown"},
        {value: "green", label: "Green"},
        {value: "purple", label: "Purple"},
        {value: "yellow", label: "Yellow"},
    ],
  },

  {
    id: "size",
    name: "Size",
    options: [
        {value: "S", label: "S"},
        {value: "M", label: "M"},
        {value: "L", label: "L"},
    ],
  },
];

export const singleFilter = [
    {
        id: "price",
        name: "Price",
        options: [
            {value: "159-399", label: "₹159 To ₹399"},
            {value: "399-999", label: "₹399 To ₹999"},
            {value: "999-1999", label: "₹999 To ₹1999"},
            {value: "1999-2999", label: "₹1999 To 29399"},
            {value: "2999-4999", label: "₹2999 To ₹4999"},
        ],
    },

    {
        id: "discount",
        name: "Discount Range",
        options: [
            {value: "10", label: "10% off or more"},
            {value: "20", label: "20% off or more"},
            {value: "30", label: "30% off or more"},
            {value: "40", label: "40% off or more"},
            {value: "50", label: "50% off or more"},
            {value: "60", label: "60% off or more"},
            {value: "70", label: "70% off or more"},
            {value: "80", label: "80% off or more"},
        ],
    },

    {
        id: "stock",
        name: "Availability",
        options: [
            {value: "in_stock", label: "In Stock"},
            {value: "out_of_stock", label: "Out of Stock"},
        ],
    },
];