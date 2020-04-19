import { App, Area, Controller, Get, Content, QueryParam } from '../../src/mod.ts';
import { SpaBuilder } from '../../src/middlewares/spa-builder.ts';

@Controller('/home')
export class HomeController {
    @Get('/text')
    text(@QueryParam('name') name: string) {
        return Content(`Hey! ${name}`);
    }
}

@Area({
    controllers: [HomeController],
})
export class HomeArea {}

const app = new App({
    areas: [HomeArea],
});

app.use(
    /\/www/,
    new SpaBuilder({
        root: `${Deno.cwd()}/examples/spa/www`,
        index: 'index.html',
        baseRoute: '/www/',
    }),
);

// OR in default route

// app.use(
//     new RegExp('/'),
//     new SpaBuilder({
//         root: `${Deno.cwd()}/examples/spa/www`,
//         index: 'index.html',
//     }),
// );

app.listen();