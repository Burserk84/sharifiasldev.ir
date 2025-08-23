import type { Attribute, Schema } from '@strapi/strapi';

export interface TicketMessageTicketMessage extends Schema.Component {
  collectionName: 'components_ticket_message_ticket_messages';
  info: {
    displayName: 'TicketMessage';
  };
  attributes: {
    author: Attribute.Relation<
      'ticket-message.ticket-message',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    isResponse: Attribute.Boolean;
    message: Attribute.Text;
    sentAt: Attribute.DateTime;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'ticket-message.ticket-message': TicketMessageTicketMessage;
    }
  }
}
