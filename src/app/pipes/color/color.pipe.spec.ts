import { COLORS_MAP } from '../../model/product/colors.map';
import { ColorPipe } from './color.pipe';

describe('Color pipe', () => {

    const pipe = new ColorPipe();

    it('given color description, then return color hex', () => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        expect(pipe.transform('Amarelo')).toEqual(COLORS_MAP['Amarelo']);
    });

});
