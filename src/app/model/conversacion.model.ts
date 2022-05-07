
export interface IConversacion {
  id?: number;
}

export class Conversacion implements IConversacion {
  constructor(public id?: number) {}
}

export function getConversacionIdentifier(conversacion: IConversacion): number | undefined {
  return conversacion.id;
}
