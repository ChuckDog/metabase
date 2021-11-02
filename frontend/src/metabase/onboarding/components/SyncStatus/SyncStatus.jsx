import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { t } from "ttag";
import Icon from "metabase/components/Icon";
import Ellipsified from "metabase/components/Ellipsified";
import {
  DatabaseCard,
  DatabaseContent,
  DatabaseDescription,
  DatabaseIcon,
  DatabaseIconContainer,
  DatabaseSpinner,
  DatabaseTitle,
  Popup,
  PopupContent,
  PopupHeader,
  PopupTitle,
  PopupToggle,
} from "./SyncStatus.styled";

const propTypes = {
  databases: PropTypes.array,
};

const SyncStatus = ({ databases }) => {
  const [isOpened, setIsOpened] = useState(true);
  const handleToggle = useCallback(() => setIsOpened(state => !state), []);

  return (
    <Popup>
      <PopupHeader>
        <PopupTitle>{getTitleMessage(databases, isOpened)}</PopupTitle>
        <PopupToggle onClick={handleToggle}>
          {isOpened ? <Icon name="chevrondown" /> : <Icon name="chevronup" />}
        </PopupToggle>
      </PopupHeader>
      {isOpened && (
        <PopupContent>
          {databases.map(database => (
            <DatabaseCard key={database.id}>
              <DatabaseIcon>
                <Icon name="database" />
              </DatabaseIcon>
              <DatabaseContent>
                <DatabaseTitle>
                  <Ellipsified>{database.name}</Ellipsified>
                </DatabaseTitle>
                <DatabaseDescription>
                  {getDescriptionMessage(database)}
                </DatabaseDescription>
              </DatabaseContent>
              {database.initial_sync ? (
                <DatabaseIconContainer>
                  <Icon name="check" size={12} />
                </DatabaseIconContainer>
              ) : (
                <DatabaseSpinner size={24} borderWidth={3} />
              )}
            </DatabaseCard>
          ))}
        </PopupContent>
      )}
    </Popup>
  );
};

SyncStatus.propTypes = propTypes;

const getTitleMessage = (databases, isOpened) => {
  const tables = databases.filter(d => !d.initial_sync).flatMap(d => d.tables);
  const totalCount = tables.length;

  const done = databases.every(d => d.initial_sync);
  const doneCount = tables.filter(t => t.initial_sync).length;
  const donePercentage = Math.floor((doneCount / totalCount) * 100);

  return done
    ? t`Done!`
    : isOpened && totalCount
    ? t`Syncing... (${donePercentage}%`
    : t`Syncing...`;
};

const getDescriptionMessage = database => {
  const doneCount = database.tables.filter(t => t.initial_sync).length;
  const totalCount = database.tables.length;

  return t`${doneCount} of ${totalCount} done`;
};

export default SyncStatus;
