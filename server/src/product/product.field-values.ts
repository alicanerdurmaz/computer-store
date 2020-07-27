const manufacturer = [
  'Casper',
  'Lenovo',
  'Dell',
  'MSI',
  'Acer',
  'Apple',
  'Toshiba',
  'Monster',
  'Huawei',
  'Microsoft',
  'Gigabyte',
  'Aorus',
  'Razer',
  'Samsung',
  'Xiaomi',
  'Asus',
];

const resolution = [
  '1280 x 800',
  '1440 x 900',
  '1680 x 1050',
  '1920 x 1200',
  '2560 x 1600',
  '1024 x 576',
  '1152 x 648',
  '1280 x 720',
  '1366 x 768',
  '1600 x 900',
  '1920 x 1080',
  '2560 x 1440',
  '3840 x 2160',
  '7680 x 4320',
  '5120 x 2880',
  '3840 x 2160',
  '2880 x 1800',
  '2560 x 1600',
  '2880 x 1800',
  '2732 x 1536',
];
const screenPanelType = [
  'IPS',
  'VA',
  'OLED',
  'TN',
  'PLS',
  'S-IPS',
  'H-IPS',
  'e-IPS',
  'P-IPS',
  'AHVA',
];
const refreshRate = [60, 75, 90, 120, 144, 240, 320, 160, 165, 180];
const memory = [1, 2, 3, 4, 6, 8, 12, 14, 16, 18, 20, 24, 32, 64, 128, 512];
const cpuCoreCount = [1, 2, 3, 4, 6, 8, 12, 14, 16, 18, 20, 24, 32, 64, 128];

const productFieldValues = {
  memory: memory,
  cpuCoreCount: cpuCoreCount,
  resolution: resolution,
  manufacturer: manufacturer,
  screenPanelType: screenPanelType,
  refreshRate: refreshRate,
};

export default productFieldValues;
