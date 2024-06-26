import { SlashCommandBuilder } from 'discord.js';
import type { SlashCommandProps, CommandOptions } from 'commandkit';
import axios, { AxiosResponse } from 'axios';

export const data = new SlashCommandBuilder()
  .setName('nga-gameserver-stop')
  .setDescription('Performs an in-game server action.')
  .addStringOption(option => option.setName('identifier').setDescription('Selected action will be performed on given server.').setRequired(true))

export async function run({ interaction, client, handler }: SlashCommandProps) {
  await interaction.deferReply({ ephemeral: false });

};

export const options: CommandOptions = {
  userPermissions: ['Administrator'],
};