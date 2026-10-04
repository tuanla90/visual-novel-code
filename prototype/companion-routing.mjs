/** Shared routing for the UI and server; only companions present may speak. */
export function routeCompanion(characters, message, target) {
  const present = ['tung', 'ha-vy'].filter((id) => characters.includes(id));
  const normalized = message.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
  const names = message.toLowerCase().normalize('NFC');
  // Match the actual name: stripping accents would confuse “từng” with Tùng.
  const named = present.filter((id) => id === 'tung'
    ? /(?:^|[^\p{L}\p{N}_])(?:tùng|tung)(?=$|[^\p{L}\p{N}_])/u.test(names)
    : /(?:^|[^\p{L}\p{N}_])vy(?=$|[^\p{L}\p{N}_])/u.test(names));
  const addressed = present.includes(target) ? target : named.length === 1 ? named[0] : null;
  if (addressed) return { primary: addressed };
  const reasoning = /\b(bang chung|du kien|du lieu|truy van|can cu|kiem chung|kiem tra|doi chieu|suy luan|ket luan|mau thuan|tinh|con so|chac|vi sao|tai sao)\b/.test(normalized);
  const primary = present.includes('ha-vy') && reasoning ? 'ha-vy' : present[0];
  const wantsGroup = named.length > 1 || /\b(hai ban|cac ban|moi nguoi|nghi sao|y kien)\b/.test(normalized);
  // A second voice is eligible only where another perspective can help; the model may still stay silent.
  const secondary = (wantsGroup || reasoning) ? present.find((id) => id !== primary) : undefined;
  return { primary, ...(secondary ? { secondary } : {}) };
}
