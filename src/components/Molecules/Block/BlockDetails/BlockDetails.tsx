import { Address } from "@/components/Atoms";
import { Timestamp } from "@/components/Atoms";
import { CardDetail } from "@/components/Shared";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    GRK_SIZES,
    DEFAULT_ERROR_MESSAGE,
    FALLBACK_ERROR,
} from "@/utils/constants/shared.constants";
import { None, Some, type Option } from "@/utils/option";
import { useGoldRush } from "@/utils/store";
import { type BlockDetailsProps } from "@/utils/types/molecules.types";
import { type CardDetailProps } from "@/utils/types/shared.types";
import type { GoldRushResponse, Block } from "@covalenthq/client-sdk";
import { useEffect, useState } from "react";

export const BlockDetails: React.FC<BlockDetailsProps> = ({
    chain_name,
    height,
}) => {
    const { goldrushClient } = useGoldRush();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [maybeResult, setMaybeResult] = useState<Option<Block | null>>(None);

    useEffect(() => {
        (async () => {
            setMaybeResult(None);
            setErrorMessage(null);
            try {
                const { data, ...error } =
                    await goldrushClient.BaseService.getBlock(
                        chain_name,
                        height.toString(),
                    );
                if (error.error) {
                    throw error;
                }
                if (!data?.items?.[0]) {
                    throw FALLBACK_ERROR;
                }
                setMaybeResult(new Some(data.items[0]));
            } catch (error: GoldRushResponse<null> | any) {
                setErrorMessage(error?.error_message ?? DEFAULT_ERROR_MESSAGE);
                setMaybeResult(new Some(null));
                console.error(error);
            }
        })();
    }, [chain_name, height]);

    return (
        <Card className="grid w-full grid-cols-1 items-start gap-4 break-all border p-2 md:grid-cols-3">
            {maybeResult.match({
                None: () => (
                    <>
                        {Array(8)
                            .fill(null)
                            .map(() => (
                                <div key={Math.random()}>
                                    <Skeleton size={GRK_SIZES.LARGE} />
                                </div>
                            ))}
                    </>
                ),
                Some: (block) =>
                    errorMessage ? (
                        <p className="col-span-3">{errorMessage}</p>
                    ) : block ? (
                        (
                            [
                                {
                                    heading: "HEIGHT",
                                    content: block.height?.toLocaleString(),
                                },
                                {
                                    heading: "SIGNED AT",
                                    content: (
                                        <Timestamp
                                            timestamp={block.signed_at}
                                        />
                                    ),
                                },
                                {
                                    heading: "BLOCK HASH",
                                    content: (
                                        <Address address={block.block_hash} />
                                    ),
                                },
                                {
                                    heading: "GAS USED",
                                    content: block.gas_used,
                                    subtext: `${(
                                        (Number(block.gas_used) /
                                            Number(block.gas_limit)) *
                                        100
                                    ).toFixed(2)}%`,
                                },
                                {
                                    heading: "GAS LIMIT",
                                    content: block.gas_limit?.toLocaleString(),
                                },
                                {
                                    heading: "MINER ADDRESS",
                                    content: (
                                        <Address
                                            address={block.miner_address}
                                        />
                                    ),
                                },
                                {
                                    heading: "BLOCK PARENT HASH",
                                    content: (
                                        <Address
                                            address={block.block_parent_hash}
                                        />
                                    ),
                                },
                                {
                                    heading: "EXTRA DATA",
                                    content: block.extra_data,
                                },
                            ] as CardDetailProps[]
                        ).map((props) => (
                            <CardDetail
                                key={props.heading?.toString()}
                                {...props}
                            />
                        ))
                    ) : (
                        <></>
                    ),
            })}
        </Card>
    );
};
