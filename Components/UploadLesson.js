import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    ScrollView,
    StyleSheet
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import * as DocumentPicker from 'expo-document-picker';
import { getMyTeacherClassesApi, uploadLessonApi } from '../api/authapi';
import { useAuth } from '../Context/authContext';

export default function UploadLesson({ visible, onClose }) {
    const { token } = useAuth();

    const [lessonTitle, setLessonTitle] = useState('');
    const [subject, setSubject] = useState(null);
    const [className, setClassName] = useState(null);
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);

    const [openSubject, setOpenSubject] = useState(false);
    const [openClass, setOpenClass] = useState(false);

    const [subjectItems, setSubjectItems] = useState([]);
    const [classItems, setClassItems] = useState([]);

    const uploadLesson = async () => {
        const data = await uploadLessonApi(token, {
            lessonTitle,
            subject,
            classId: className,
            description,
            video: videoFile,
        });

        if (data.success) {
            alert("Lesson uploaded successfully!");
            onClose();
        } else {
            alert(data.message);
        }
    };

    // Fetch classes and subjects from API
    useEffect(() => {
        const fetchClasses = async () => {
            const classes = await getMyTeacherClassesApi(token);
            if (classes.length > 0) {
                const classOptions = classes.map(cls => ({
                    label: cls.name,
                    value: cls.id,
                }));
                setClassItems(classOptions);

                const subjectsSet = new Set();
                classes.forEach(cls => {
                    cls.subjects.forEach(sub => subjectsSet.add(sub));
                });
                const subjectOptions = Array.from(subjectsSet).map(sub => ({
                    label: sub,
                    value: sub,
                }));
                setSubjectItems(subjectOptions);
            }
        };
        fetchClasses();
    }, [token]);

    const pickVideo = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: 'video/*' });
            if (result.type === 'success') setVideoFile(result);
        } catch (err) {
            console.log('Error picking video:', err);
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <AntDesign name="close" size={20} color="#000" />
                </TouchableOpacity>

                <View style={styles.modalContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.heading}>Upload Video Lesson</Text>

                        {/* Lesson Title Input */}
                        <Text style={styles.label}>Lesson Title</Text>
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Lesson Name"
                            placeholderTextColor="#6B7280"
                            value={lessonTitle}
                            onChangeText={setLessonTitle}
                        />

                        {/* Subject Dropdown */}
                        <Text style={styles.label}>Subject</Text>
                        <DropDownPicker
                            open={openSubject}
                            value={subject}
                            items={subjectItems}
                            setOpen={setOpenSubject}
                            setValue={setSubject}
                            placeholder="Select Subject"
                            placeholderStyle={styles.placeholderText}
                            style={styles.inputBox}
                            dropDownContainerStyle={styles.dropdownContainer}
                            listMode="MODAL"
                        />

                        {/* Class Dropdown */}
                        <Text style={styles.label}>Class</Text>
                        <DropDownPicker
                            open={openClass}
                            value={className}
                            items={classItems}
                            setOpen={setOpenClass}
                            setValue={setClassName}
                            placeholder="Select Class"
                            placeholderStyle={styles.placeholderText}
                            style={styles.inputBox}
                            dropDownContainerStyle={styles.dropdownContainer}
                            listMode="MODAL"
                        />

                        {/* Description */}
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={[styles.inputBox, styles.textArea]}
                            placeholder="Description"
                            placeholderTextColor="#6B7280"
                            multiline
                            numberOfLines={4}
                            value={description}
                            onChangeText={setDescription}
                        />

                        {/* Video File Upload */}
                        <Text style={styles.label}>Video File</Text>
                        <TouchableOpacity style={styles.videoUpload} onPress={pickVideo}>
                            <AntDesign name="cloudupload" size={32} color="#6B7280" />
                            <Text style={styles.mainText}>Drag & drop your video here</Text>
                            <Text style={styles.subText}>
                                Or click to browse files (MP4, WebM, Ogg up to 500MB)
                            </Text>

                            <TouchableOpacity style={styles.selectFileButton} onPress={pickVideo}>
                                <Text style={styles.selectFileText}>Select File</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>

                        {videoFile && (
                            <Text style={{ marginTop: 8, fontSize: 14, color: '#111' }}>
                                Selected: {videoFile.name}
                            </Text>
                        )}

                        {/* Upload Button */}
                        <TouchableOpacity style={styles.uploadButton} onPress={uploadLesson}>
                            <Text style={styles.uploadButtonText}>Upload Lesson</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 20,
    },

    modalContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: 'hidden',
        padding: 16,
        height: 660,
        width: 358,
    },

    closeButton: {
        position: 'absolute',
        top: '14%',
        right: '3%',
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 6,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        zIndex: 10,
    },

    heading: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 15,
        color: '#000',
    },

    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
        marginTop: 20,
        color: '#111827',
    },

    inputBox: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        height: 46,
        paddingHorizontal: 10,
        fontSize: 14,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },

    placeholderText: {
        fontSize: 14,
        color: '#666666',
    },

    dropdownContainer: {
        borderColor: '#D1D5DB',
    },

    textArea: {
        height: 101,
        textAlignVertical: 'top',
        paddingTop: 8,
        paddingHorizontal: 16,
    },

    videoUpload: {
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 6,
        height: 180,
        borderStyle: 'dashed',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#fff',
    },

    mainText: {
        color: '#374151',
        fontSize: 14,
        fontWeight: '500',
        marginTop: 8,
        textAlign: 'center',
    },

    subText: {
        color: '#6B7280',
        fontSize: 11,
        marginTop: 4,
        textAlign: 'center',
    },

    selectFileButton: {
        backgroundColor: '#E5E7EB',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 6,
        marginTop: 12,
    },

    selectFileText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111827',
    },

    uploadButton: {
        backgroundColor: '#2563EB',
        padding: 14,
        borderRadius: 8,
        marginTop: 20,
    },

    uploadButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 14,
    },
});
