export default function getColor() {
  switch (Math.floor(Math.random() * 5)) {
    case 0:
      return "#F9423A";
    case 1:
      return "#F6A04D";
    case 2:
      return "#486AFF";
    case 3:
      return "#00BC7B";
    case 4:
      return "#F3D321";
  }
}
