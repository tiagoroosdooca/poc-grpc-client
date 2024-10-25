import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH =  path.join(__dirname, './protos/person/person-routes-guide.proto')
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
)
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)
const routesGuide = protoDescriptor.PersonRoutesGuide

var client = new routesGuide('localhost:50051', grpc.credentials.createInsecure());

client.getPerson({ id: 3 }, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
})

const call = client.getPeople({ idBiggerThan: 1 })

call
    .on('data', (data) => {
        console.log(data);
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        console.log('done');
    })