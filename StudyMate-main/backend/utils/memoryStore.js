import bcrypt from 'bcryptjs';

/**
 * In-memory fallback store for StudyMate backend.
 * Allows junior students to run and test the application immediately
 * even before configuring their MongoDB Atlas connection string.
 */

export const memoryStore = {
  users: [],
  subjects: [],
  tasks: [],
  studySessions: [],

  // User Operations
  async findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  async findUserById(id) {
    return this.users.find(u => u._id.toString() === id.toString()) || null;
  },

  async createUser({ name, email, password }) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      _id: 'mem_usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date(),
      async matchPassword(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
      }
    };

    this.users.push(newUser);
    return newUser;
  },

  // Subject Operations
  async findSubjects(userId) {
    return this.subjects.filter(s => s.user.toString() === userId.toString());
  },

  async createSubject({ user, name, color }) {
    const newSubject = {
      _id: 'mem_sbj_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      user: user.toString(),
      name,
      color: color || '#4F46E5',
      createdAt: new Date()
    };
    this.subjects.push(newSubject);
    return newSubject;
  },

  async updateSubject(id, userId, updates) {
    const index = this.subjects.findIndex(s => s._id === id && s.user.toString() === userId.toString());
    if (index === -1) return null;
    this.subjects[index] = { ...this.subjects[index], ...updates };
    return this.subjects[index];
  },

  async deleteSubject(id, userId) {
    this.subjects = this.subjects.filter(s => !(s._id === id && s.user.toString() === userId.toString()));
    this.tasks = this.tasks.filter(t => t.subject?.toString() !== id.toString());
  },

  // Task Operations
  async findTasks(userId, { search, status, priority, subject, sortBy } = {}) {
    let filtered = this.tasks.filter(t => t.user.toString() === userId.toString());

    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(t => t.title.toLowerCase().includes(term) || (t.description && t.description.toLowerCase().includes(term)));
    }

    if (status && status !== 'All') {
      filtered = filtered.filter(t => t.status === status);
    }

    if (priority && priority !== 'All') {
      filtered = filtered.filter(t => t.priority === priority);
    }

    if (subject && subject !== 'All') {
      filtered = filtered.filter(t => t.subject?._id?.toString() === subject || t.subject?.toString() === subject);
    }

    // Populate subject
    const populated = filtered.map(t => {
      const subjObj = typeof t.subject === 'object' && t.subject !== null 
        ? t.subject 
        : this.subjects.find(s => s._id === t.subject?.toString()) || { name: 'General', color: '#4F46E5' };
      return { ...t, subject: subjObj };
    });

    // Sorting
    if (sortBy === 'title') {
      populated.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'created') {
      populated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      // Default: earliest deadline first
      populated.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }

    return populated;
  },

  async createTask({ user, subject, title, description, priority, deadline }) {
    const subjObj = typeof subject === 'object' ? subject : this.subjects.find(s => s._id === subject?.toString()) || { _id: subject, name: 'General', color: '#4F46E5' };
    
    const newTask = {
      _id: 'mem_tsk_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      user: user.toString(),
      subject: subjObj,
      title,
      description: description || '',
      priority: priority || 'Medium',
      deadline: new Date(deadline),
      status: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.tasks.push(newTask);
    return newTask;
  },

  async updateTask(id, userId, updates) {
    const index = this.tasks.findIndex(t => t._id === id && t.user.toString() === userId.toString());
    if (index === -1) return null;

    if (updates.subject) {
      const subjObj = typeof updates.subject === 'object' ? updates.subject : this.subjects.find(s => s._id === updates.subject?.toString());
      if (subjObj) updates.subject = subjObj;
    }

    this.tasks[index] = {
      ...this.tasks[index],
      ...updates,
      updatedAt: new Date()
    };

    return this.tasks[index];
  },

  async deleteTask(id, userId) {
    this.tasks = this.tasks.filter(t => !(t._id === id && t.user.toString() === userId.toString()));
  },

  // Study Session Operations
  async findStudySessions(userId) {
    const filtered = this.studySessions.filter(s => s.user.toString() === userId.toString());
    return filtered.map(s => {
      const subjObj = typeof s.subject === 'object' && s.subject !== null 
        ? s.subject 
        : this.subjects.find(sbj => sbj._id === s.subject?.toString()) || { name: 'General Study', color: '#4F46E5' };
      return { ...s, subject: subjObj };
    });
  },

  async createStudySession({ user, subject, topic, date, startTime, endTime }) {
    const subjObj = typeof subject === 'object' ? subject : this.subjects.find(s => s._id === subject?.toString()) || { _id: subject, name: 'General Study', color: '#4F46E5' };

    const newSession = {
      _id: 'mem_ses_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      user: user.toString(),
      subject: subjObj,
      topic,
      date: new Date(date),
      startTime,
      endTime,
      createdAt: new Date()
    };

    this.studySessions.push(newSession);
    return newSession;
  },

  async updateStudySession(id, userId, updates) {
    const index = this.studySessions.findIndex(s => s._id === id && s.user.toString() === userId.toString());
    if (index === -1) return null;

    if (updates.subject) {
      const subjObj = typeof updates.subject === 'object' ? updates.subject : this.subjects.find(s => s._id === updates.subject?.toString());
      if (subjObj) updates.subject = subjObj;
    }

    this.studySessions[index] = { ...this.studySessions[index], ...updates };
    return this.studySessions[index];
  },

  async deleteStudySession(id, userId) {
    this.studySessions = this.studySessions.filter(s => !(s._id === id && s.user.toString() === userId.toString()));
  }
};
