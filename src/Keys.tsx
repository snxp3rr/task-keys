import { useState } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    // Храним изменённые данные
    const [items, setItems] = useState<IItem[]>(props.initialData);
    
    // Храним ID редактируемого элемента и его текущее (ещё не сохранённое) значение
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingValue, setEditingValue] = useState('');

    // Сортируем на лету, используя актуальный проп sorting.
    // Это гарантирует, что при изменении пропа извне список пересортируется корректно.
    const sortedItems = [...items].sort((a, b) =>
        props.sorting === 'ASC' ? a.id - b.id : b.id - a.id
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

    return (
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
    );
}