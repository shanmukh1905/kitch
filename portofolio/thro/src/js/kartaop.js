import { readFileSync } from 'fs';

function readCIF(filePath) {
    let con = [];
    let x = [];
    let y = [];
    let z = [];

    const data = readFileSync(filePath, 'utf8').split('\n');
    data.forEach(line => {
        if (line.match(/^([#_](?!END)).*/)) {
            con.push(line);
        } else if (line.match(/^[A-Z]/)) {
            const parts = line.trim().split(/\s+/);
            x.push(parseFloat(parts[2]));
            y.push(parseFloat(parts[3]));
            z.push(parseFloat(parts[4]));
        }
    });

    const atomsFractCoords = {};

    x.forEach((coord, index) => {
        const atomName = `atom${index + 1}`;
        atomsFractCoords[atomName] = [coord, y[index], z[index]];
    });

    return { con, atomsFractCoords };
}

const filePath = 'file.cif';
const { con, atomsFractCoords } = readCIF(filePath);
console.log('Lines:', con);
console.log('Atom Coordinates:', atomsFractCoords);
