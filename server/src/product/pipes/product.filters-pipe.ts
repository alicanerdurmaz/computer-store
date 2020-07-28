import { PipeTransform } from '@nestjs/common';

export class ProductFiltersPipe implements PipeTransform {
  readonly shouldTransformToMinMax = [
    'Price',
    'Weight',
    'CPU Core Count',
    'CPU Core Clock',
    'CPU Boost Clock',
    'Memory',
  ];
  readonly shouldTransformToInArray = [
    'Manufacturer',
    'Screen Size',
    'Screen Panel Type',
    'Resolution',
    'Refresh Rate',
    'CPU',
    'GPU',
    'Operating System',
    'SD Card Reader',
  ];

  transform(query: Record<string, string>): Record<string, unknown> {
    const find = {};
    const sort = query.sort;
    const page = parseInt(query.page) || 1;

    for (const [key, value] of Object.entries(query)) {
      if (this.shouldTransformToInArray.includes(key)) {
        const values = value.split(',');
        find[key] = { $in: values };
      }
      if (this.shouldTransformToMinMax.includes(key)) {
        const values = value.split(',');
        find[key] = {
          $gte: values[0],
          $lte: values[1],
        };
      }
    }

    return { find, sort, page };
  }
}
