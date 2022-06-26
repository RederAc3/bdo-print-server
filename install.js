#!/usr/bin/env node

import inquirer from 'inquirer';
import { program } from 'commander';
import axios from 'axios';

import generateUrlPrinter from './functions/generateUrlPrinter.js'

const receiver = async () => {

    const { code } = await inquirer.prompt([
        { type: 'input', name: 'code', message: 'Podaj kod użytkownika:' }
    ]);

    const user = await axios.get(`http://localhost:3000/users/${code}`);

    if (user.data.status === 'success') {
        try {
            await axios.put(`http://localhost:3000/users/${user.data.data.id}`, { printer: generateUrlPrinter() });
            console.log('Konfiguracja przebiegła pomyślnie. \nDrukarka dodana do konta.');

        } catch (error) {
            console.log('Wystąpił błąd. Spróbuj ponownie.')

        }

    } else console.log('Kod niepoprawny! Podaj kod wygenerowany w aplikacji "Ustawienia > Drukarki > Dodaj drukarkę"')

}

program
    .version('1.0.0')
    .action(receiver)

program.parse(process.argv)