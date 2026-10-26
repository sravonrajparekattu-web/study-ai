import React, { useState, useEffect } from 'react';
import { Plus, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { getStudySessions, createStudySession, updateStudySession, deleteStudySession } from '../services/scheduleService';
import { getSubjects } from '../services/subjectService';
import ScheduleCard from '../components/ScheduleCard';
import ScheduleForm from '../components/ScheduleForm';
import Modal from '../components/Modal';
import Button from '../components/Button';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';

const StudySchedulePage = () => {
  const [sessions, setSessions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);

  const fetchSessions = async () => {
    try {
      const [sessionRes, subjectRes] = await Promise.all([
        getStudySessions(),
        getSubjects()
      ]);
      if (sessionRes.success) setSessions(sessionRes.data);
      if (subjectRes.success) setSubjects(subjectRes.data);
    } catch (err) {
      console.error('Error fetching schedule:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingSession) {
        await updateStudySession(editingSession._id, formData);
      } else {
        await createStudySession(formData);
      }
      setIsModalOpen(false);
      setEditingSession(null);
      fetchSessions();
    } catch (err) {
      console.error('Error saving study session:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this study session?')) {
      try {
        await deleteStudySession(id);
        fetchSessions();
      } catch (err) {
        console.error('Error deleting session:', err);
      }
    }
  };

  const openCreateModal = () => {
    setEditingSession(null);
    setIsModalOpen(true);
  };

  const openEditModal = (session) => {
    setEditingSession(session);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Study Session Schedule</h1>
          <p className="page-subtitle">Plan dedicated focus blocks and daily revision routines per topic.</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={openCreateModal}>
          Add Study Session
        </Button>
      </div>

      {loading ? (
        <LoadingState message="Retrieving study schedule..." />
      ) : sessions.length === 0 ? (
        <EmptyState
          icon={CalendarIcon}
          title="No study sessions planned ⏰"
          description="Schedule your study blocks to ensure consistent progress across all course modules."
          actionText="Add First Session"
          onAction={openCreateModal}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {sessions.map((session) => (
            <ScheduleCard
              key={session._id}
              session={session}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Schedule Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingSession ? 'Edit Study Session' : 'Add Study Session'}>
        <ScheduleForm
          initialData={editingSession}
          subjects={subjects}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default StudySchedulePage;
