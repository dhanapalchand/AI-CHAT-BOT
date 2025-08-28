import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Container, Title, Text, TextInput, Textarea, Button, Group, Grid } from '@mantine/core';
import { IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-react';
import { useCreateWorkspace } from '../../api/queries';
import { FileUpload } from '../../types';
import FileUploadZone from './components/FileUploadZone';
import GlassCard from '../../components/ui/GlassCard';
import Preloader from '../../components/ui/Preloader';

const CreateWorkspacePage: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<FileUpload[]>([]);
  const navigate = useNavigate();
  const createWorkspace = useCreateWorkspace();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('Please enter a workspace name');
      return;
    }

    try {
      await createWorkspace.mutateAsync({
        name: name.trim(),
        description: description.trim(),
        files: files,
      });
      
      navigate('/');
    } catch (error) {
      console.error('Error creating workspace:', error);
      alert('Failed to create workspace. Please try again.');
    }
  };

  if (createWorkspace.isPending) {
    return <Preloader message="Creating workspace..." />;
  }

  return (
    <div 
      className="min-h-screen pt-20 pb-8"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            onClick={() => navigate('/')}
            variant="subtle"
            leftSection={<IconArrowLeft size={20} />}
            className="liquid-button mb-6"
            styles={{
              root: {
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            Back to Workspaces
          </Button>
          
          <Title order={1} size="h1" c="white" mb="sm">
            Create New Workspace
          </Title>
          <Text size="lg" c="rgba(255, 255, 255, 0.8)">
            Set up a new AI workspace for your organization's documents
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <Grid>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                  <div className="space-y-6">
                    <div>
                      <Text size="sm" fw={500} c="white" mb="sm">
                        Workspace Name *
                      </Text>
                      <TextInput
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Marketing Team, Engineering Docs"
                        required
                        styles={{
                          input: {
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '12px',
                            color: 'white',
                            '&::placeholder': {
                              color: 'rgba(255, 255, 255, 0.6)',
                            },
                          },
                        }}
                      />
                    </div>

                    <div>
                      <Text size="sm" fw={500} c="white" mb="sm">
                        Description
                      </Text>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe what this workspace contains and its purpose..."
                        rows={6}
                        styles={{
                          input: {
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '12px',
                            color: 'white',
                            '&::placeholder': {
                              color: 'rgba(255, 255, 255, 0.6)',
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </Grid.Col>

                <Grid.Col span={{ base: 12, lg: 6 }}>
                  <Text size="sm" fw={500} c="white" mb="md">
                    Upload Documents
                  </Text>
                  <FileUploadZone files={files} onFilesChange={setFiles} />
                </Grid.Col>
              </Grid>

              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/20">
                <Button
                  type="button"
                  onClick={() => navigate('/')}
                  variant="subtle"
                  c="rgba(255, 255, 255, 0.8)"
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  disabled={createWorkspace.isPending || !name.trim()}
                  leftSection={<IconDeviceFloppy size={20} />}
                  className="liquid-button"
                  styles={{
                    root: {
                      background: createWorkspace.isPending || !name.trim() 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : 'linear-gradient(45deg, #667eea, #764ba2)',
                      color: 'white',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  Create Workspace
                </Button>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      </Container>
    </div>
  );
};

export default CreateWorkspacePage;