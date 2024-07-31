const BASE_URL = 'http://localhost:3000/equipment';

const getAllEquipment = async  (req, res) => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Ausrüstungsgegenstände');
        }
        const equipmentList = await response.json();
        
        // Equipment-Listenansicht mit dynamischen Daten rendern
        res.render('equipment', { equipment: equipmentList, activePage: 'equipment'  });
    } catch (error) {
        console.error('Fehler beim Abrufen der Ausrüstungsgegenstände:', error.message);
        res.status(500).send('Fehler beim Abrufen der Ausrüstungsgegenstände.');
    }
};

const addEquipment = async (req, res) => {
    const { articlenumber, title, description, count, userid } = req.body; // Daten aus dem Anfragekörper abrufen
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ articlenumber, title, description, count, userid }),
        });

        if (!response.ok) {
            throw new Error('Fehler beim Hinzufügen eines Ausrüstungsgegenstands');
        }

        // Erfolgreiche Hinzufügung und Weiterleitung zur Equipment-Übersicht
        res.redirect('/equipment');
    } catch (error) {
        console.error('Fehler beim Hinzufügen eines Ausrüstungsgegenstands:', error.message);
        res.status(500).send('Fehler beim Hinzufügen eines Ausrüstungsgegenstands.');
    }
};

const getEquipment = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Ausrüstungsgegenstand nicht gefunden');
        }
        const equipmentItem = await response.json();
        
        // Detailansicht für das Equipment rendern und activePage setzen
        res.render('equipmentDetail', {
            equipment: equipmentItem,
            activePage: 'equipment'  // Hier setzen wir activePage
        });
    } catch (error) {
        console.error('Fehler beim Abrufen des Ausrüstungsgegenstands:', error.message);
        res.status(404).send('Ausrüstungsgegenstand nicht gefunden.');
    }
};


const updateEquipment = async (req, res) => {
    const { id } = req.params; // ID des zu aktualisierenden Equipments
    const { articlenumber, title, description, count, userid } = req.body; // Neue Daten aus dem Anfragekörper

    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ articlenumber, title, description, count, userid }),
        });

        if (!response.ok) {
            throw new Error('Fehler beim Aktualisieren des Ausrüstungsgegenstands');
        }

        // Erfolgreiches Update und Weiterleitung zur Einzelansicht
        res.redirect(`/equipment/${id}`);
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Ausrüstungsgegenstands:', error.message);
        res.status(500).send('Fehler beim Aktualisieren des Ausrüstungsgegenstands.');
    }

};

const deleteEquipment = async (req, res) => {
    const { id } = req.params; // ID des zu löschenden Equipments

    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Fehler beim Löschen des Ausrüstungsgegenstands');
        }

        // Erfolgreiches Löschen und Weiterleitung zur Equipment-Übersicht
        res.redirect('/equipment');
    } catch (error) {
        console.error('Fehler beim Löschen des Ausrüstungsgegenstands:', error.message);
        res.status(500).send('Fehler beim Löschen des Ausrüstungsgegenstands.');
    }

};

const getEditEquipment = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Ausrüstungsgegenstand nicht gefunden');
        }
        const equipmentItem = await response.json();
        res.render('equipmentEdit', { equipment: equipmentItem, activePage: 'equipment' });
    } catch (error) {
        console.error('Fehler beim Abrufen des Ausrüstungsgegenstands:', error.message);
        res.status(404).send('Ausrüstungsgegenstand nicht gefunden.');
    }
};



module.exports = {
    getAllEquipment, addEquipment, getEquipment, updateEquipment, deleteEquipment
};