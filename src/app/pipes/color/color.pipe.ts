import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { COLORS_MAP } from '../../model/product/colors.map';

@Pipe({name: 'color'})
@Injectable()
export class ColorPipe implements PipeTransform {
    transform(item: string): string {
        return COLORS_MAP[item];
    }
};
