import { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonStyle, PermissionFlagsBits, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import type { SlashCommandProps, CommandOptions } from 'commandkit';
import { ButtonKit } from 'commandkit';

export const data = new SlashCommandBuilder()
  .setName('ng-setup-account')
  .setDescription('Follow the onboarding process to initialize your account.')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

export async function run({ interaction }: SlashCommandProps) {
  await interaction.deferReply({ ephemeral: false });

  const embed = new EmbedBuilder()
    .setDescription("**Account Setup & Overview**\nThank you for installing this application. Below, you'll have an option to link your [account token](https://i.imgur.com/a3b9GkZ.mp4) for a seamless integration.\n\n**Additional Information**\nDesigned for Nitrado. Built without complexity, able to directly connect to any host-able gameserver. Guaranteed uptime.")
    .setFooter({ text: "Note: Contact support if issues persist.", iconURL: "https://i.imgur.com/6OWyTsr.png" })
    .setImage("https://i.imgur.com/M8ZnsOt.png")
    .setColor(0xffd744)

  const installation = new ButtonKit()
    .setCustomId('ng-setup-token')
    .setLabel('Setup Token')
    .setStyle(ButtonStyle.Primary);

  const donation = new ButtonKit()
    .setURL('https://example.com/')
    .setLabel('Contact Support')
    .setStyle(ButtonStyle.Link);

  const row = new ActionRowBuilder<ButtonKit>()
    .addComponents(installation, donation);

  const message = await interaction.followUp({ embeds: [embed], components: [row] });

  installation
    .onClick(
      async (interaction: ButtonInteraction) => {
        const modal = new ModalBuilder()
          .setCustomId('ng-modal-token')
          .setTitle('Nitrado Token Verification');

        const row: ActionRowBuilder<TextInputBuilder> = new ActionRowBuilder<TextInputBuilder>()
          .addComponents(
            new TextInputBuilder()
              .setCustomId('ng-token-option').setLabel('Required Nitrado Token').setMinLength(50).setMaxLength(150)
              .setPlaceholder('...oAg66TcQYUnYXBQn17A161-N86cN5jWDp7')
              .setStyle(TextInputStyle.Short)
              .setRequired(true)
          );

        modal.addComponents(row);
        await interaction.showModal(modal)
      }, { message },
    )
    .onEnd(() => {
      installation.setDisabled(true);
      message.edit({ components: [row] });
    });
};

export const options: CommandOptions = {
  userPermissions: ['Administrator'],
};