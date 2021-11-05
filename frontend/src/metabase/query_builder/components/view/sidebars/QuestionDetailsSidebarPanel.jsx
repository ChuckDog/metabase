import React from "react";
import PropTypes from "prop-types";

import QuestionActionButtons from "metabase/query_builder/components/QuestionActionButtons";
import { ClampedDescription } from "metabase/query_builder/components/ClampedDescription";
import QuestionActivityTimeline from "metabase/query_builder/components/QuestionActivityTimeline";

import { PLUGIN_MODERATION } from "metabase/plugins";

import {
  Container,
  SidebarPaddedContent,
} from "./QuestionDetailsSidebarPanel.styled";

QuestionDetailsSidebarPanel.propTypes = {
  question: PropTypes.object.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  removeModerationReview: PropTypes.func.isRequired,
};

function QuestionDetailsSidebarPanel({
  question,
  onOpenModal,
  removeModerationReview,
}) {
  const canWrite = question.canWrite();
  const description = question.description();

  const onDescriptionEdit = canWrite
    ? () => {
        onOpenModal("edit");
      }
    : undefined;

  return (
    <Container>
      <SidebarPaddedContent>
        <QuestionActionButtons
          canWrite={canWrite}
          isDataset={question.isDataset()}
          onOpenModal={onOpenModal}
        />
        <ClampedDescription
          visibleLines={8}
          description={description}
          onEdit={onDescriptionEdit}
        />
        <PLUGIN_MODERATION.QuestionModerationSection question={question} />
      </SidebarPaddedContent>
      <QuestionActivityTimeline question={question} />
    </Container>
  );
}

export default QuestionDetailsSidebarPanel;
