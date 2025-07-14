import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useAuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import styles from './EditProfileModal.css';

const validSections = ['basic', 'experience', 'education', 'skills', 'uploads', 'profileDescription'];

const EditProfileModal = ({ show, onHide, section, profileData, userId, onUpdate }) => {
    const { user } = useAuthContext();
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const firstInputRef = useRef(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!show || !section || !validSections.includes(section)) {
            if (show) {
                toast.error('Invalid section selected.', { role: 'alert' });
                onHide();
            }
            return;
        }

        if (!user || user.id !== userId) {
            toast.error('Unauthorized: You can only edit your own profile.', { role: 'alert' });
            onHide();
            return;
        }

        if (!profileData) return;

        let initialData = {};
        switch (section) {
            case 'basic':
                initialData = {
                    id: userId,
                    firstName: profileData.user?.firstName || '',
                    lastName: profileData.user?.lastName || '',
                    email: profileData.user?.email || '',
                    mobile: profileData.user?.mobile || '',
                    altMobile: profileData.user?.altMobile || '',
                    city: profileData.user?.city || '',
                    currentCity: profileData.user?.currentCity || '',
                    preferredJobLocations: profileData.user?.preferredJobLocations || '',
                    dob: profileData.user?.dob ? profileData.user.dob.split('T')[0] : '',
                    gender: profileData.user?.gender || '',
                    nationality: profileData.user?.nationality || '',
                };
                break;
            case 'experience':
                const exp = profileData.experiences?.[0] || {};
                initialData = {
                    id: exp.id || '',
                    userId,
                    totalExperience: exp.totalExperience || '',
                    designation: exp.designation || '',
                    companyName: exp.companyName || '',
                    typeOfEmployment: exp.typeOfEmployment || '',
                    achievements: exp.achievements || '',
                    companyUrl: exp.companyUrl || '',
                    annualSalary: exp.annualSalary || '',
                    noticePeriod: exp.noticePeriod || '',
                    industry: exp.industry || '',
                    responsibilities: exp.responsibilities || '',
                    isCurrentEmployee: exp.isCurrentEmployee || false,
                };
                break;
            case 'education':
                const edu = profileData.educations?.[0] || {};
                initialData = {
                    id: edu.id || '',
                    userId,
                    qualification: edu.qualification || '',
                    course: edu.course || '',
                    specialization: edu.specialization || '',
                    college: edu.college || '',
                    passingYear: edu.passingYear || '',
                    percentage: edu.percentage || '',
                    isHighest: edu.isHighest || false,
                    additionalCertificates: edu.additionalCertificates?.map(cert => cert.name) || [''],
                };
                break;
            case 'skills':
                const skills = profileData.skills?.[0] || {};
                initialData = {
                    id: skills.id || '',
                    userId,
                    topSkills: skills.topSkills || '',
                    streamSkills: skills.streamSkills || '',
                    stream: skills.stream || '',
                };
                break;
            case 'uploads':
                initialData = {
                    userId,
                    portfolioUrl: profileData.user?.portfolioUrl || '',
                    resumeFile: null,
                    imageFile: null,
                    backgroundImageFile: null,
                    videoPitchFile: null,
                    additionalDocumentFiles: [''],
                    additionalDocumentDescriptions: [''],
                    workSampleFiles: [''],
                    workSampleDescriptions: [''],
                };
                break;
            case 'profileDescription':
                initialData = {
                    id: userId,
                    profileDescription: profileData.user?.profileDescription || '',
                };
                break;
            default:
                break;
        }
        setFormData(initialData);
    }, [show, section, profileData, userId, user, onHide]);

    useEffect(() => {
        if (show && firstInputRef.current) {
            setTimeout(() => firstInputRef.current?.focus(), 100);
        }
    }, [show, section]);

    useEffect(() => {
        if (show) {
            document.body.classList.add('modal-open-no-scroll');
        } else {
            document.body.classList.remove('modal-open-no-scroll');
        }
    }, [show]);

    const handleInputChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }, []);

    const handleFileChange = useCallback((e, field) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.files[0],
        }));
    }, []);

    const handleArrayChange = useCallback((index, field, value) => {
        const updatedArray = [...(formData[field] || [])];
        updatedArray[index] = value;
        setFormData(prev => ({
            ...prev,
            [field]: updatedArray,
        }));
    }, [formData]);

    const addArrayItem = useCallback((field) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...(prev[field] || []), ''],
        }));
    }, []);

    const validateForm = () => {
        if (section === 'basic') {
            if (!formData.firstName || !formData.lastName) {
                setError('First and last names are required.');
                return false;
            }
            if (!formData.email?.includes('@')) {
                setError('Invalid email address.');
                return false;
            }
        }
        if (section === 'profileDescription') {
            if (formData.profileDescription?.length > 500) {
                setError('Profile description cannot exceed 500 characters.');
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || user.id !== userId) {
            toast.error('Unauthorized: You can only edit your own profile.', { role: 'alert' });
            return;
        }
        if (!validSections.includes(section)) {
            toast.error('Invalid section selected.', { role: 'alert' });
            return;
        }
        if (!validateForm()) return;

        setError(null);
        setLoading(true);

        const formDataToSend = new FormData();
        try {
            let response;
            switch (section) {
                case 'basic':
                    response = await axios.post('https://facehiringapi.codingster.in/User/UpdateBasicInfo', formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        timeout: 10000,
                    });
                    console.log('Basic Info API Response:', response.data);
                    const responseCode = response.data.responseCode ?? response.data.responceCode;
                    if (responseCode === 1) {
                        console.log('Success: responseCode is 1, showing success toast.');
                        toast.success('Basic info updated successfully!',);
                        try {
                            console.log('Calling onUpdate()...');
                            onUpdate();
                            console.log('onUpdate() completed successfully.');
                        } catch (updateErr) {
                            console.error('Error in onUpdate():', updateErr.message || updateErr);
                            toast.error('Profile updated, but failed to refresh data.', { role: 'alert' });
                        }
                        try {
                            console.log('Closing modal with onHide()...');
                            onHide();
                            console.log('Modal closed successfully.');
                        } catch (hideErr) {
                            console.error('Error in onHide():', hideErr.message || hideErr);
                            toast.error('Profile updated, but failed to close modal.', { role: 'alert' });
                        }
                    } else {
                        console.log('Failure: responseCode is not 1, throwing error.');
                        throw new Error(response.data?.message || 'Failed to update basic info');
                    }
                    break;

                case 'experience':
                    response = await axios.post('https://facehiringapi.codingster.in/User/Update_Experience', formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        timeout: 10000,
                    });
                    console.log('Experience API Response:', response.data);
                    const responseCodeExp = response.data.responseCode ?? response.data.responceCode;
                    if (responseCodeExp === 1) {
                        toast.success('Experience updated successfully!',);
                        try {
                            onUpdate();
                        } catch (updateErr) {
                            console.error('Error in onUpdate():', updateErr.message || updateErr);
                            toast.error('Profile updated, but failed to refresh data.', { role: 'alert' });
                        }
                        try {
                            onHide();
                        } catch (hideErr) {
                            console.error('Error in onHide():', hideErr.message || hideErr);
                            toast.error('Profile updated, but failed to close modal.', { role: 'alert' });
                        }
                    } else {
                        throw new Error(response.data?.message || 'Failed to update experience');
                    }
                    break;

                case 'education':
                    Object.keys(formData).forEach((key) => {
                        if (key === 'additionalCertificates') {
                            formData[key].forEach((cert, idx) => {
                                formDataToSend.append(`additionalCertificates[${idx}]`, cert);
                            });
                        } else {
                            formDataToSend.append(key, formData[key]);
                        }
                    });
                    response = await axios.post('https://facehiringapi.codingster.in/User/Update_Education', formDataToSend, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
                            'Accept': 'application/json',
                        },
                        timeout: 10000,
                    });
                    console.log('Education API Response:', response.data);
                    const responseCodeEdu = response.data.responseCode ?? response.data.responceCode;
                    if (responseCodeEdu === 1) {
                        console.log('Success: responseCode is 1, showing success toast for education.');
                        toast.success('Education updated successfully!',);
                        try {
                            console.log('Calling onUpdate() for education...');
                            onUpdate();
                            console.log('onUpdate() completed successfully for education.');
                        } catch (updateErr) {
                            console.error('Error in onUpdate() for education:', updateErr.message || updateErr);
                            toast.error('Profile updated, but failed to refresh data.', { role: 'alert' });
                            throw updateErr; // Re-throw to ensure the outer catch block handles this
                        }
                        try {
                            console.log('Closing modal with onHide() for education...');
                            onHide();
                            console.log('Modal closed successfully for education.');
                        } catch (hideErr) {
                            console.error('Error in onHide() for education:', hideErr.message || hideErr);
                            toast.error('Profile updated, but failed to close modal.', { role: 'alert' });
                            throw hideErr; // Re-throw to ensure the outer catch block handles this
                        }
                        console.log('Education section update completed successfully.');
                    } else {
                        console.log('Failure: responseCode is not 1 for education, throwing error.');
                        throw new Error(response.data?.message || 'Failed to update education');
                    }
                    break;

                case 'skills':
                    response = await axios.post('https://facehiringapi.codingster.in/User/Update_Skills', formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        timeout: 10000,
                    });
                    console.log('Skills API Response:', response.data);
                    const responseCodeSkills = response.data.responseCode ?? response.data.responceCode;
                    if (responseCodeSkills === 1) {
                        toast.success('Skills updated successfully!',);
                        try {
                            onUpdate();
                        } catch (updateErr) {
                            console.error('Error in onUpdate():', updateErr.message || updateErr);
                            toast.error('Profile updated, but failed to refresh data.', { role: 'alert' });
                        }
                        try {
                            onHide();
                        } catch (hideErr) {
                            console.error('Error in onHide():', hideErr.message || hideErr);
                            toast.error('Profile updated, but failed to close modal.', { role: 'alert' });
                        }
                    } else {
                        throw new Error(response.data?.message || 'Failed to update skills');
                    }
                    break;

                case 'uploads':
                    Object.keys(formData).forEach((key) => {
                        if (Array.isArray(formData[key])) {
                            formData[key].forEach((item, idx) => {
                                formDataToSend.append(`${key}[${idx}]`, item);
                            });
                        } else if (formData[key] instanceof File) {
                            formDataToSend.append(key, formData[key]);
                        } else {
                            formDataToSend.append(key, formData[key]);
                        }
                    });
                    response = await axios.post('https://facehiringapi.codingster.in/User/UpdateUpload', formDataToSend, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
                            'Accept': 'application/json',
                        },
                        timeout: 10000,
                    });
                    console.log('Uploads API Response:', response.data);
                    const responseCodeUploads = response.data.responseCode ?? response.data.responceCode;
                    if (responseCodeUploads === 1) {
                        toast.success('Uploads updated successfully!',);
                        try {
                            onUpdate();
                        } catch (updateErr) {
                            console.error('Error in onUpdate():', updateErr.message || updateErr);
                            toast.error('Profile updated, but failed to refresh data.', { role: 'alert' });
                        }
                        try {
                            onHide();
                        } catch (hideErr) {
                            console.error('Error in onHide():', hideErr.message || hideErr);
                            toast.error('Profile updated, but failed to close modal.', { role: 'alert' });
                        }
                    } else {
                        throw new Error(response.data?.message || 'Failed to update uploads');
                    }
                    break;

                case 'profileDescription':
                    response = await axios.post(
                        'https://facehiringapi.codingster.in/User/UpdateBasicInfo',
                        { id: userId, profileDescription: formData.profileDescription },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                            },
                            timeout: 10000,
                        }
                    );
                    console.log('Profile Description API Response:', response.data);
                    const responseCodeProfile = response.data.responseCode ?? response.data.responceCode;
                    if (responseCodeProfile === 1) {
                        toast.success('Profile description updated successfully!',);
                        try {
                            onUpdate();
                        } catch (updateErr) {
                            console.error('Error in onUpdate():', updateErr.message || updateErr);
                            toast.error('Profile updated, but failed to refresh data.', { role: 'alert' });
                        }
                        try {
                            onHide();
                        } catch (hideErr) {
                            console.error('Error in onHide():', hideErr.message || hideErr);
                            toast.error('Profile updated, but failed to close modal.', { role: 'alert' });
                        }
                    } else {
                        throw new Error(response.data?.message || 'Failed to update profile description');
                    }
                    break;

                default:
                    toast.error('Invalid section selected.', { role: 'alert' });
                    break;
            }
            console.log('Try block completed successfully.');
        } catch (err) {
            console.error('Catch block triggered:', err.message || err);
            // Only show error toast if the error is not related to a successful update
            if (err.message && err.message.toLowerCase().includes('success')) {
                console.log('Suppressing error toast because the operation was successful.');
                // Operation was successful, no need to show an error toast
            } else {
                const errorMessage = err.message || `Failed to update ${section}`;
                toast.error(errorMessage, { role: 'alert' });
            }
        } finally {
            setLoading(false);
            console.log('Finally block: Loading set to false.');
        }
    };

    const renderForm = () => {
        if (!section || !validSections.includes(section)) return null;

        switch (section) {
            case 'basic':
                return (
                    <>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName || ''}
                                        onChange={handleInputChange}
                                        ref={firstInputRef}
                                        required
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName || ''}
                                        onChange={handleInputChange}
                                        required
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email || ''}
                                        onChange={handleInputChange}
                                        required
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Mobile</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="mobile"
                                        value={formData.mobile || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Alternate Mobile</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="altMobile"
                                        value={formData.altMobile || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        value={formData.city || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Current City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="currentCity"
                                        value={formData.currentCity || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Preferred Job Locations</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="preferredJobLocations"
                                        value={formData.preferredJobLocations || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dob"
                                        value={formData.dob || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="gender"
                                        value={formData.gender || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Nationality</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nationality"
                                        value={formData.nationality || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </>
                );
            case 'experience':
                return (
                    <>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Total Experience (Years)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="totalExperience"
                                        value={formData.totalExperience || ''}
                                        onChange={handleInputChange}
                                        ref={firstInputRef}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Designation</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="designation"
                                        value={formData.designation || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Type of Employment</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="typeOfEmployment"
                                        value={formData.typeOfEmployment || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Company URL</Form.Label>
                                    <Form.Control
                                        type="url"
                                        name="companyUrl"
                                        value={formData.companyUrl || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Annual Salary (LPA)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="annualSalary"
                                        value={formData.annualSalary || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Notice Period (Days)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="noticePeriod"
                                        value={formData.noticePeriod || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Industry</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="industry"
                                        value={formData.industry || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Achievements</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="achievements"
                                        value={formData.achievements || ''}
                                        onChange={handleInputChange}
                                        className={`${styles.modernInput} textarea`}
                                        rows={4}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Responsibilities</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="responsibilities"
                                        value={formData.responsibilities || ''}
                                        onChange={handleInputChange}
                                        className={`${styles.modernInput} textarea`}
                                        rows={4}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Check
                                        type="checkbox"
                                        name="isCurrentEmployee"
                                        label="Currently Employed"
                                        checked={formData.isCurrentEmployee || false}
                                        onChange={handleInputChange}
                                        className={styles.modernCheckbox}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </>
                );
            case 'education':
                return (
                    <>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Qualification</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="qualification"
                                        value={formData.qualification || ''}
                                        onChange={handleInputChange}
                                        ref={firstInputRef}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Course</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="course"
                                        value={formData.course || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Specialization</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="specialization"
                                        value={formData.specialization || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>College</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="college"
                                        value={formData.college || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Passing Year</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="passingYear"
                                        value={formData.passingYear || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Percentage</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="percentage"
                                        value={formData.percentage || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Check
                                        type="checkbox"
                                        name="isHighest"
                                        label="Highest Qualification"
                                        checked={formData.isHighest || false}
                                        onChange={handleInputChange}
                                        className={styles.modernCheckbox}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Additional Certificates</Form.Label>
                                    {formData.additionalCertificates?.map((cert, index) => (
                                        <Form.Control
                                            key={index}
                                            type="text"
                                            value={cert || ''}
                                            onChange={(e) => handleArrayChange(index, 'additionalCertificates', e.target.value)}
                                            className={`${styles.modernInput} mb-2`}
                                        />
                                    ))}
                                    <Button
                                        variant="link"
                                        onClick={() => addArrayItem('additionalCertificates')}
                                        className={styles.modernLink}
                                    >
                                        + Add Certificate
                                    </Button>
                                </Form.Group>
                            </Col>
                        </Row>
                    </>
                );
            case 'skills':
                return (
                    <>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Top Skills (comma-separated)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="topSkills"
                                        value={formData.topSkills || ''}
                                        onChange={handleInputChange}
                                        ref={firstInputRef}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Stream Skills</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="streamSkills"
                                        value={formData.streamSkills || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Stream</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="stream"
                                        value={formData.stream || ''}
                                        onChange={handleInputChange}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </>
                );
            case 'uploads':
                return (
                    <>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Portfolio URL</Form.Label>
                                    <Form.Control
                                        type="url"
                                        name="portfolioUrl"
                                        value={formData.portfolioUrl || ''}
                                        onChange={handleInputChange}
                                        ref={firstInputRef}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Resume</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="resumeFile"
                                        onChange={(e) => handleFileChange(e, 'resumeFile')}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Profile Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="imageFile"
                                        onChange={(e) => handleFileChange(e, 'imageFile')}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Background Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="backgroundImageFile"
                                        onChange={(e) => handleFileChange(e, 'backgroundImageFile')}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Video Pitch</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="videoPitchFile"
                                        onChange={(e) => handleFileChange(e, 'videoPitchFile')}
                                        className={styles.modernInput}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Additional Documents</Form.Label>
                                    {formData.additionalDocumentFiles?.map((_, index) => (
                                        <div key={index} className="mb-2">
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Control
                                                        type="file"
                                                        onChange={(e) => handleArrayChange(index, 'additionalDocumentFiles', e.target.files[0])}
                                                        className={`${styles.modernInput} mb-1`}
                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Description"
                                                        value={formData.additionalDocumentDescriptions?.[index] || ''}
                                                        onChange={(e) => handleArrayChange(index, 'additionalDocumentDescriptions', e.target.value)}
                                                        className={styles.modernInput}
                                                    />
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                                    <Button
                                        variant="link"
                                        onClick={() => {
                                            addArrayItem('additionalDocumentFiles');
                                            addArrayItem('additionalDocumentDescriptions');
                                        }}
                                        className={styles.modernLink}
                                    >
                                        + Add Document
                                    </Button>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Work Samples</Form.Label>
                                    {formData.workSampleFiles?.map((_, index) => (
                                        <div key={index} className="mb-2">
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Control
                                                        type="file"
                                                        onChange={(e) => handleArrayChange(index, 'workSampleFiles', e.target.files[0])}
                                                        className={`${styles.modernInput} mb-1`}
                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Description"
                                                        value={formData.workSampleDescriptions?.[index] || ''}
                                                        onChange={(e) => handleArrayChange(index, 'workSampleDescriptions', e.target.value)}
                                                        className={styles.modernInput}
                                                    />
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                                    <Button
                                        variant="link"
                                        onClick={() => {
                                            addArrayItem('workSampleFiles');
                                            addArrayItem('workSampleDescriptions');
                                        }}
                                        className={styles.modernLink}
                                    >
                                        + Add Work Sample
                                    </Button>
                                </Form.Group>
                            </Col>
                        </Row>
                    </>
                );
            case 'profileDescription':
                return (
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group>
                                <Form.Label>Profile Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="profileDescription"
                                    value={formData.profileDescription || ''}
                                    onChange={handleInputChange}
                                    ref={firstInputRef}
                                    className={`${styles.modernInput} textarea`}
                                    rows={5}
                                    maxLength={500}
                                />
                                <Form.Text className="text-muted">
                                    {formData.profileDescription?.length || 0}/500 characters
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                );
            default:
                return null;
        }
    };

    return (
        <Row className={styles.modalParentRow}>
            <Col md={8} className={`mx-auto ${styles.modalParentCol}`}>
                <Modal
                    show={show}
                    onHide={onHide}
                    centered
                    className={`${styles.modernModal} modal-lg`}
                    dialogClassName={styles.modernModalDialog}
                    contentClassName={styles.customModalContent}
                >
                    <Modal.Header className={`${styles.modernModalHeader} position-relative`}>
                        <Modal.Title className={styles.modernModalTitle}>
                            Edit {section.charAt(0).toUpperCase() + section.slice(1)}
                        </Modal.Title>
                        <Button
                            variant="link"
                            onClick={onHide}
                            className={styles.customCloseButton}
                            aria-label="Close"
                        >
                            ×
                        </Button>
                    </Modal.Header>
                    <Form onSubmit={handleSubmit}>
                        <Modal.Body className={styles.modernModalBody}>
                            {error && <div className={`${styles.modernAlert} alert alert-danger`} role="alert">{error}</div>}
                            {renderForm()}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={onHide}
                                disabled={loading}
                                className={`${styles.modernButton} ${styles.modernButtonSecondary}`}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={loading}
                                className={`${styles.modernButton} ${styles.modernButtonPrimary}`}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Col>
        </Row>
    );
};

export default EditProfileModal;

/*
 * Note: If the success toast is still red, check your global CSS or Toastify configuration.
 * Ensure `import 'react-toastify/dist/ReactToastify.css';` is included in your app.
 * Verify that no custom styles are overriding `.Toastify__toast--success` to make it red.
 * Add this to your CSS if needed:
 * .Toastify__toast--success {
 *     background: #07bc0c !important;
 * }
 */