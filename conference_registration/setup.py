from setuptools import setup, find_packages

setup(
    name='conference_registration',
    version='0.1.0',
    description='Conference Registration',
    author='Mfundo-debug Didit',
    include_package_data=True,
    install_requires=[
        'django==4.2.11',
        'djangorestframework==3.15.2',
        'django-cors-headers==4.2.0',
    ],
    packages=find_packages(),
    entry_points={
        'console_scripts': [
            'conference_registration = conference_registration.manage:main',
        ],
    },
)