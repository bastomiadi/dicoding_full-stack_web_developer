import React from 'react';
import NoteItem from './NoteItem';

function NotesList({ notes, onDelete, onArchive, dataTestId = 'notes-list' }) {
  // [Basic] Validasi apakah array notes memiliki isi
  const hasNotes = notes && notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        {/* [Basic] Pesan informatif saat catatan kosong */}
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak ada catatan untuk ditampilkan.
        </p>
      </div>
    );
  }

  // [Advanced] Mengelompokkan catatan berdasarkan Bulan dan Tahun
  const groupedNotes = notes.reduce((groups, note) => {
    const date = new Date(note.createdAt);
    const monthYear = date.toLocaleString('id-ID', {
      month: 'long',
      year: 'numeric',
    });

    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(note);
    return groups;
  }, {});

  return (
    <div className="notes-list" data-testid={dataTestId}>
      {Object.keys(groupedNotes).map((monthYear) => (
        <section key={monthYear} className="notes-group">
          <h3 className="notes-group__title">{monthYear}</h3>

          <div className="notes-list__container">
            {/* [Basic/Skilled] Render NoteItem untuk setiap catatan dalam grup */}
            {groupedNotes[monthYear].map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default NotesList;