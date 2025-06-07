import { getUnansweredQuesiton } from "@/lib/utils";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";

interface IProps {
  testDone: boolean;
  unansweredQuestion: number[];
}

export default function TestSubmit({ testDone, unansweredQuestion }: IProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {testDone && (
        <Button color="danger" onPress={onOpen}>
          Finish test
        </Button>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Finish Test
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to finish the test?</p>
                {unansweredQuestion.length > 0 && (
                  <>
                    <p>
                      You have unanswered questions. Finish the test regardless?
                    </p>
                    <p>
                      Unanswered questions: {unansweredQuestion.join(", ")}.
                    </p>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={onClose}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
