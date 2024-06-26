import { Events, ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalActionRowComponentBuilder, Client, Interaction, ModalBuilder } from 'discord.js';
import { ModalProps } from '../event-interface/interface';

export default function (client: Client<true>) {
  client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    if (interaction.isButton()) {
      if (interaction.customId === '...') {
        // Button configuration
      }
    }

    if (interaction.isModalSubmit()) {
      if (interaction.customId === 'ng-modal-token') {
        const information: ModalProps = {
          token: interaction.fields.getTextInputValue('ng-token-option'),
        };

        console.log(information)

      }
    }
  });
}