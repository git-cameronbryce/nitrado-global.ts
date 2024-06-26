import { discord } from './other-config/configuration.json'
import { Client, GatewayIntentBits } from 'discord.js';
import { createClient } from '@supabase/supabase-js'
import { CommandKit } from 'commandkit';
import { database } from './other-config/configuration.json'

export const supabase = createClient(database.url, database.key)

import path from 'path';
const client: Client<boolean> = new Client({
  intents: [GatewayIntentBits.Guilds],
});

new CommandKit({
  client,
  commandsPath: path.join(__dirname, 'command-handler'),
  eventsPath: path.join(__dirname, 'event-handler'),
  devGuildIds: ['1219480518131716126'],
  bulkRegister: true
});


client.login(discord.token).then(() => console.log('Client logged in...'))