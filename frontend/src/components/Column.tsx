// src/components/Column.tsx
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2 } from 'lucide-react';
import { Member, StatusType } from '../api/memberService';

interface ColumnProps {
    column: {
        id: StatusType;
        title: string;
        members: Member[];
    };
    handleDeleteMember: (columnId: StatusType, memberId: string) => void;
}

const SortableMemberCard: React.FC<{ member: Member; handleDelete: () => void }> = ({ member, handleDelete }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: member.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white p-4 mb-3 rounded-lg shadow-md flex justify-between items-center relative"
        >
            <div>
                <h3 className="font-semibold text-lg text-gray-800">
                    {member.title} {member.name}
                </h3>
                <p className="text-sm text-gray-500">{member.email}</p>
                <p className="text-sm text-gray-500">{member.mobileNumber}</p>
            </div>
            <div className="text-gray-600 text-sm font-medium">{member.age} yo</div>
            <button
                onClick={handleDelete}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
                aria-label="Delete member"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
};

const Column: React.FC<ColumnProps> = ({ column, handleDeleteMember }) => {
    const { setNodeRef } = useDroppable({
        id: column.id,
    });

    return (
        <div ref={setNodeRef} className="bg-[#e6e6e6] p-4 rounded-lg w-full max-h-[500px] overflow-y-auto"> {/* Column styling */}
            <h2 className="text-lg font-semibold mb-4 flex justify-between items-center text-gray-800">
                <span>{column.title}</span>
                <span className="bg-gray-300 text-gray-800 text-sm font-bold py-1 px-2 rounded-full">
                    {column.members.length}
                </span>
            </h2>
            {column.members.map((member) => (
                <SortableMemberCard
                    key={member.id}
                    member={member}
                    handleDelete={() => handleDeleteMember(column.id, member.id)}
                />
            ))}
        </div>
    );
};

export default Column;
