import { useState } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [items, setItems] = useState<IItem[]>(props.initialData);
    const [currentSorting, setCurrentSorting] = useState(props.sorting);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingValue, setEditingValue] = useState('');

    const sortedItems = [...items].sort((a, b) =>
        currentSorting === 'ASC' ? a.id - b.id : b.id - a.id
    );

    const handleStartEdit = (item: IItem) => {
        setEditingId(item.id);
        setEditingValue(item.name);
    };

    const handleSave = (id: number, value: string) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, name: value } : item
        ));
        setEditingId(null);
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    const toggleSorting = () => {
        setCurrentSorting(prev => prev === 'ASC' ? 'DESC' : 'ASC');
    };

    return (
        <div>
            <button onClick={toggleSorting}>Change sorting</button>
            <ul>
                {sortedItems.map(item => (
                    <li key={item.id}>
                        {editingId === item.id ? (
                            <input
                                value={editingValue}
                                onChange={e => setEditingValue(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        handleSave(item.id, editingValue);
                                    } else if (e.key === 'Escape') {
                                        handleCancel();
                                    }
                                }}
                                autoFocus
                            />
                        ) : (
                            <div onClick={() => handleStartEdit(item)}>
                                {item.name}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}