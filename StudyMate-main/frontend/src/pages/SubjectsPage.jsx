import React, { useState, useEffect } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import { getSubjects, createSubject, updateSubject, deleteSubject } from '../services/subjectService';
import SubjectCard from '../components/SubjectCard';
import SubjectForm from '../components/SubjectForm';
import Modal from '../components/Modal';
import Button from '../components/Button';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  const fetchSubjects = async () => {
    try {
      const res = await getSubjects();
      if (res.success) setSubjects(res.data);
    } catch (err) {
      console.error('Error fetching subjects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingSubject) {
        await updateSubject(editingSubject._id, formData);
      } else {
        await createSubject(formData);
      }
      setIsModalOpen(false);
      setEditingSubject(null);
      fetchSubjects();
    } catch (err) {
      console.error('Error saving subject:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deleting this subject will also delete all tasks associated with it. Are you sure?')) {
      try {
        await deleteSubject(id);
        fetchSubjects();
      } catch (err) {
        console.error('Error deleting subject:', err);
      }
    }
  };

  const openCreateModal = () => {
    setEditingSubject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (subject) => {
    setEditingSubject(subject);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Course Subjects & Modules</h1>
          <p className="page-subtitle">Organize your academic curriculum and track completion progress per course.</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={openCreateModal}>
          Add New Subject
        </Button>
      </div>

      {loading ? (
        <LoadingState message="Loading your course subjects..." />
      ) : subjects.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No subjects added yet 📚"
          description="Create your subjects (e.g. Data Structures, DBMS, Mathematics) to group your tasks and study sessions."
          actionText="Add First Subject"
          onAction={openCreateModal}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {subjects.map((subject) => (
            <SubjectCard
              key={subject._id}
              subject={subject}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Subject Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingSubject ? 'Edit Subject' : 'Add New Subject'}>
        <SubjectForm
          initialData={editingSubject}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default SubjectsPage;
