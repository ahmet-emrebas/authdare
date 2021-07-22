
import { Server } from 'http'
import * as express from 'express'
import { Config } from './config';
import * as multer from 'multer'
import { join } from 'path';

const upload = multer({ dest: join(__dirname, 'uploads') });

export function startConfigServer(callback: () => Promise<void>) {



    const configApp = express();

    configApp.use(express.json())
    configApp.use(express.urlencoded({ extended: true }))

    let server!: Server;
    configApp.get('/default', async (req, res) => {

    })

    configApp.get('/config', (req, res) => {
        res.send(`
    <form action="/config0/" method="POST" enctype="multipart/form-data">
        <label for="config">Upload configuration file</label><br/>
        <input id="config" type="file" name="config" accept="application/JSON"/></br/>
        <input type="submit"/>
    <form>
    `)

    })

    configApp.post('/config0', upload.single('config'), async (req, res) => {
        const { port, } = req.query;
        console.log(req.query)
        console.log(req.body);
        console.log(req.file)
        console.log(req.files)
        Object.assign(Config, req.query);

        res.redirect(req.host + ":" + Config.PORT)
        setTimeout(async () => {
            server.close();
            await callback();
        }, 1);
    })

    server = configApp.listen(3000);
}