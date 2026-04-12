// Home — Página principal da Ficha de RPG Digital
// Design: Dark Fantasy Manga — "O Cara Que Estou Afim Não É Um Cara"

import { useState } from "react";
import { CharacterSheet } from "@/components/CharacterSheet";
import { CharacterSelect } from "@/components/CharacterSelect";

export default function Home() {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    localStorage.getItem('selectedCharacterId')
  );

  const handleSelectCharacter = (characterId: string) => {
    localStorage.setItem('selectedCharacterId', characterId);
    setSelectedCharacterId(characterId);
  };

  const handleBackToSelect = () => {
    setSelectedCharacterId(null);
  };

  if (!selectedCharacterId) {
    return <CharacterSelect onSelectCharacter={handleSelectCharacter} />;
  }

  return <CharacterSheet characterId={selectedCharacterId} onBackToSelect={handleBackToSelect} />;
}
