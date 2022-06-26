#!/usr/bin/env node

import inquirer from 'inquirer';
import { program } from 'commander';
import axios from 'axios';

import generateUrlPrinter from './functions/generateUrlPrinter.js'

const receiver = async () => {
    const { code } = await inquirer.prompt([
        { type: 'input', name: 'code', message: 'Podaj kod użytkownika:' }
    ]);
    const user = await axios.get(`https://bdo.rdnt.pl/users/${code}`);
    if (user) {
        await axios.put(`https://bdo.rdnt.pl/users/${user.id}`, { pritner: generateUrlPrinter()});
    }

    console.log('Konfiguracja przebiegła pomyślnie. \nDrukarka dodana do konta.');

}

program
    .version('1.0.0')
    .action(receiver)

program.parse(process.argv)