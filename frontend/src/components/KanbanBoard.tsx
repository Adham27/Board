/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    DndContext,
    DragEndEvent,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { getMembers, createMember, updateMember, deleteMember, Member, StatusType } from '../api/memberService';
import AddMemberForm from './AddMemberForm';
import Column from './Column';

interface ColumnType {
    id: StatusType;
    title: string;
    members: Member[];
}

const KanbanBoard: React.FC = () => {
    const [columns, setColumns] = useState<ColumnType[]>([
        { id: 'UNCLAIMED', title: 'Unclaimed', members: [] },
        { id: 'FIRST_CONTACT', title: 'First Contact', members: [] },
        { id: 'PREPARING_WORK_OFFER', title: 'Preparing Work Offer', members: [] },
        { id: 'SEND_TO_THERAPIST', title: 'Send to Therapist', members: [] },
    ]);

    const [formData, setFormData] = useState<Omit<Member, 'id' | 'status'>>({
        name: '',
        title: '',
        age: 0,
        email: '',
        mobileNumber: '',
    });

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const members = await getMembers();
            const newColumns = columns.map((column) => ({
                ...column,
                members: members.filter((member) => member.status === column.id),
            }));
            setColumns(newColumns);
        } catch (error) {
            toast.error('Error fetching members');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'age' ? parseInt(value) || 0 : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newMember = await createMember({
                ...formData,
                status: 'UNCLAIMED',
            });
            setColumns((prev) =>
                prev.map((column) =>
                    column.id === 'UNCLAIMED'
                        ? { ...column, members: [...column.members, newMember] }
                        : column
                )
            );
            setFormData({ name: '', title: '', age: 0, email: '', mobileNumber: '' });
            toast.success("Patient added successfully!");
        } catch (error) {
            toast.error("Error adding patient!");
        }
    };

    const handleDeleteMember = async (columnId: StatusType, memberId: string) => {
        try {
            await deleteMember(memberId);
            setColumns((prevColumns) =>
                prevColumns.map((column) =>
                    column.id === columnId
                        ? {
                            ...column,
                            members: column.members.filter(
                                (member) => member.id !== memberId
                            ),
                        }
                        : column
                )
            );
            toast.success("Patient deleted successfully!");
        } catch (error) {
            toast.error("Error deleting patient");
        }
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeColumn = columns.find((column) =>
            column.members.some((member) => member.id === active.id)
        );
        const overColumn = columns.find((column) => column.id === over.id);

        if (!activeColumn || !overColumn || activeColumn.id === overColumn.id) return;

        const activeMember = activeColumn.members.find((member) => member.id === active.id);
        if (!activeMember) return;

        const updatedColumns = columns.map((column) => {
            if (column.id === activeColumn.id) {
                return {
                    ...column,
                    members: column.members.filter((member) => member.id !== active.id),
                };
            } else if (column.id === overColumn.id) {
                return {
                    ...column,
                    members: [...column.members, { ...activeMember, status: overColumn.id }],
                };
            }
            return column;
        });

        setColumns(updatedColumns);

        try {
            await updateMember(active.id as string, { status: overColumn.id });
            toast.success("Status updated successfully!");
        } catch (error) {
            toast.error("Error updating status");
            setColumns(columns); // Rollback on failure
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 overflow-hidden  bg-[#cae5f7]"> {/* Disable all scrolling */}
            <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
                Mental Health Clinic Kanban Board
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 overflow-hidden">
                <div className="lg:col-span-1">
                    <AddMemberForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
                <div className="lg:col-span-4 overflow-hidden">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {columns.map((column) => (
                                <SortableContext
                                    key={column.id}
                                    items={column.members.map((member) => member.id)}
                                    strategy={rectSortingStrategy}
                                >
                                    <Column
                                        column={column}
                                        handleDeleteMember={handleDeleteMember}
                                    />
                                </SortableContext>
                            ))}
                        </div>
                    </DndContext>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default KanbanBoard;
